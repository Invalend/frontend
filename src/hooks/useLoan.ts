"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_CONFIGS } from "@/config/contracts";
import { parseUSDC } from "@/utils/formatters";

export const useCreateLoan = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const amountRaw = useMemo(() => parseUSDC(amount || "0"), [amount]);

  const { data: usdcBalance, refetch: refetchBalance } = useReadContract({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    functionName: "allowance",
    args: [address as `0x${string}`, CONTRACT_CONFIGS.LOAN_MANAGER.address],
    query: { enabled: !!address },
  });

  const { data: requiredCollateral, refetch: refetchCollateral } =
    useReadContract({
      ...CONTRACT_CONFIGS.LOAN_MANAGER,
      functionName: "getRequiredCollateral",
      args: [amountRaw],
      query: { enabled: amountRaw > BigInt(0) },
    });

  const { data: poolFunding, refetch: refetchFunding } = useReadContract({
    ...CONTRACT_CONFIGS.LOAN_MANAGER,
    functionName: "getPoolFunding",
    args: [amountRaw],
    query: { enabled: amountRaw > BigInt(0) },
  });

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: createLoan, data: createLoanHash } =
    useWriteContract();

  const { isLoading: isApproving, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isCreatingLoan, isSuccess: isCreateLoanSuccess } =
    useWaitForTransactionReceipt({ hash: createLoanHash });

  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance();
      refetchCollateral();
      refetchFunding();
      setError("");
    }
  }, [isApproveSuccess, refetchAllowance, refetchCollateral, refetchFunding]);

  useEffect(() => {
    if (isCreateLoanSuccess) {
      refetchBalance();
      setAmount("");
      setError("");
    }
  }, [isCreateLoanSuccess, refetchBalance]);

  const needsApproval = useMemo(() => {
    if (!allowance) return true;
    return amountRaw > allowance;
  }, [allowance, amountRaw]);

  const isValidAmount = useMemo(() => {
    if (!amountRaw || !usdcBalance || amountRaw <= BigInt(0)) return false;
    if (amountRaw > usdcBalance) return false;
    return true;
  }, [amountRaw, usdcBalance]);

  const handleApprove = async () => {
    if (!address || amountRaw <= BigInt(0)) return;
    setError("");
    try {
      await approve({
        ...CONTRACT_CONFIGS.MOCK_USDC,
        functionName: "approve",
        args: [
          CONTRACT_CONFIGS.LOAN_MANAGER.address,
          BigInt(2) ** BigInt(256) - BigInt(1),
        ],
      });
    } catch (err: unknown) {
      console.error("Approval error:", err);
      setError("Approval failed.");
    }
  };

  const handleCreateLoan = async () => {
    if (!address || amountRaw <= BigInt(0)) return;
    if (needsApproval) {
      setError("Please approve USDC first.");
      return;
    }
    setError("");
    try {
      await createLoan({
        ...CONTRACT_CONFIGS.LOAN_MANAGER,
        functionName: "createLoan",
        args: [amountRaw],
      });
    } catch (err: unknown) {
      console.error("CreateLoan error:", err);
      setError("Loan creation failed.");
    }
  };

  return {
    amount,
    setAmount,
    error,
    setError,
    usdcBalance,
    allowance,
    requiredCollateral,
    poolFunding,
    needsApproval,
    isValidAmount,
    isApproving,
    isCreatingLoan,
    isApproveSuccess,
    isCreateLoanSuccess,
    handleApprove,
    handleCreateLoan,
    refetchAllowance,
    refetchBalance,
    refetchCollateral,
    refetchFunding,
  };
};

// Hook: useUserLoanInfo
export const useUserLoanInfo = () => {
  const { address } = useAccount();
  const { data: loanInfoRaw, refetch } = useReadContract({
    ...CONTRACT_CONFIGS.LOAN_MANAGER,
    functionName: "getLoanInfo",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  // Format info
  const info = loanInfoRaw
    ? {
        loanAmount: loanInfoRaw.loanAmount,
        collateralAmount: loanInfoRaw.collateralAmount,
        poolFunding: loanInfoRaw.poolFunding,
        startTime: loanInfoRaw.startTime,
        restrictedWallet: loanInfoRaw.restrictedWallet,
        isActive: loanInfoRaw.isActive,
      }
    : null;

  return { loanInfo: info, refetch };
};

// Hook: useRepayLoan
export const useRepayLoan = () => {
  const [isRepaying, setIsRepaying] = useState(false);
  const [isRepaySuccess, setIsRepaySuccess] = useState(false);
  const [error, setError] = useState("");

  // Repay transaction
  const { writeContract: repayLoan, data: repayHash } = useWriteContract();
  const { isLoading: isRepayingTx, isSuccess: isRepayTxSuccess } = useWaitForTransactionReceipt({ hash: repayHash });

  const handleRepay = async () => {
    setError("");
    setIsRepaying(true);
    try {
      await repayLoan({
        ...CONTRACT_CONFIGS.LOAN_MANAGER,
        functionName: "repayLoan",
        args: [],
      });
      setIsRepaySuccess(true);
    } catch (err: unknown) {
      console.error("Repay error:", err);
      setError("Repay failed.");
    } finally {
      setIsRepaying(false);
    }
  };

  return {
    handleRepay,
    isRepaying: isRepaying || isRepayingTx,
    isRepaySuccess: isRepaySuccess || isRepayTxSuccess,
    error,
    setError,
  };
};
