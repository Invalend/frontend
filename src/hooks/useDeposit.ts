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

export const useDeposit = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<'idle' | 'approve' | 'deposit' | 'success'>('idle');

  const amountRaw = useMemo(() => parseUSDC(amount || "0"), [amount]);

  // Balances
  const { data: usdcBalance, refetch: refetchUsdcBalance } = useReadContract({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    functionName: "allowance",
    args: [address as `0x${string}`, CONTRACT_CONFIGS.LENDING_POOL.address],
    query: { enabled: !!address },
  });

  const { data: expectedShares, refetch: refetchPreview } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: "previewDeposit",
    args: [amountRaw],
    query: { enabled: amountRaw > BigInt(0) },
  });

  const { data: userInfo, refetch: refetchUserInfo } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: "getUserInfo",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  // Transactions
  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: deposit, data: depositHash } = useWriteContract();

  const { isLoading: isApproving, isSuccess: isApproveSuccess, isError: isApproveError } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isDepositing, isSuccess: isDepositSuccess, isError: isDepositError } =
    useWaitForTransactionReceipt({ hash: depositHash });

  // Effects
  useEffect(() => {
    if (isApproveSuccess) {
      setCurrentStep('deposit');
      refetchAllowance();
      refetchUsdcBalance();
      setError("");
    }
  }, [isApproveSuccess, refetchAllowance, refetchUsdcBalance]);

  useEffect(() => {
    if (isApproveError) {
      setCurrentStep('idle');
      setError("Approval gagal. Silakan coba lagi.");
    }
  }, [isApproveError]);

  useEffect(() => {
    if (isDepositSuccess) {
      setCurrentStep('success');
      refetchUsdcBalance();
      refetchUserInfo();
      refetchPreview();
      setError("");
    }
  }, [isDepositSuccess, refetchUsdcBalance, refetchUserInfo, refetchPreview]);

  useEffect(() => {
    if (isDepositError) {
      setCurrentStep('idle');
      setError("Deposit gagal. Silakan coba lagi.");
    }
  }, [isDepositError]);

  // Logic
  const needsApproval = useMemo(() => {
    if (!allowance) return true;
    return amountRaw > allowance;
  }, [allowance, amountRaw]);

  const isValidAmount = useMemo(() => {
    if (!amountRaw || !usdcBalance || amountRaw <= BigInt(0)) return false;
    if (amountRaw > usdcBalance) return false;
    return true;
  }, [amountRaw, usdcBalance]);

  // Actions
  const handleApprove = async () => {
    if (!address || amountRaw <= BigInt(0)) return;
    setError("");
    setCurrentStep('approve');
    try {
      await approve({
        ...CONTRACT_CONFIGS.MOCK_USDC,
        functionName: "approve",
        args: [CONTRACT_CONFIGS.LENDING_POOL.address, amountRaw],
      });
    } catch (err: unknown) {
      console.error("Approval error:", err);
      setError("Approval gagal. Periksa jaringan atau gas fees.");
      setCurrentStep('idle');
    }
  };

  const handleDeposit = async () => {
    if (!address || amountRaw <= BigInt(0)) return;
    if (needsApproval) {
      setError("Silakan approve USDC terlebih dahulu.");
      return;
    }
    setError("");
    setCurrentStep('deposit');
    try {
      await deposit({
        ...CONTRACT_CONFIGS.LENDING_POOL,
        functionName: "deposit",
        args: [amountRaw, address],
      });
    } catch (err: unknown) {
      console.error("Deposit error:", err);
      setError("Deposit gagal. Periksa jaringan atau limits.");
      setCurrentStep('idle');
    }
  };

  const resetStates = () => {
    setAmount("");
    setError("");
    setCurrentStep('idle');
  };

  return {
    amount,
    setAmount,
    error,
    setError,

    // Balances & Info
    usdcBalance,
    allowance,
    expectedShares,
    userInfo,

    // Validation
    needsApproval,
    isValidAmount,

    // Step Management
    currentStep,
    isApproving,
    isDepositing,
    isApproveSuccess,
    isDepositSuccess,

    // Actions
    handleApprove,
    handleDeposit,
    resetStates,

    // Refetchers
    refetchAllowance,
    refetchUsdcBalance,
    refetchUserInfo,
    refetchPreview,

    approveHash,
    depositHash,
  };
};
