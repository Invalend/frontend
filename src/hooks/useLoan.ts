"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_CONFIGS } from "@/config/contracts";
import { parseUSDC } from "@/utils/formatters";
import { validateLoanAmount, getTransactionErrorMessage } from "@/utils/validation";

export type TransactionState = {
  hash?: string;
  status: 'idle' | 'pending' | 'success' | 'error';
  error?: string;
};

export const useCreateLoan = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [approvalTx, setApprovalTx] = useState<TransactionState>({ status: 'idle' });
  const [loanTx, setLoanTx] = useState<TransactionState>({ status: 'idle' });

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
      functionName: "getRequiredMargin",
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

  const { isLoading: isApproving, isSuccess: isApproveSuccess, isError: isApproveError } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isCreatingLoan, isSuccess: isCreateLoanSuccess, isError: isCreateLoanError } =
    useWaitForTransactionReceipt({ hash: createLoanHash });

  // Validation
  const validationResult = useMemo(() => {
    return validateLoanAmount(amount, usdcBalance);
  }, [amount, usdcBalance]);

  useEffect(() => {
    setValidationError(validationResult || "");
  }, [validationResult]);

  // Update approval transaction state
  useEffect(() => {
    if (approveHash) {
      setApprovalTx({ status: 'pending', hash: approveHash });
    }
  }, [approveHash]);

  useEffect(() => {
    if (isApproveSuccess) {
      setApprovalTx(prev => ({ ...prev, status: 'success' }));
      refetchAllowance();
      refetchCollateral();
      refetchFunding();
    }
  }, [isApproveSuccess, refetchAllowance, refetchCollateral, refetchFunding]);

  useEffect(() => {
    if (isApproveError) {
      setApprovalTx(prev => ({ ...prev, status: 'error', error: 'Approval failed' }));
    }
  }, [isApproveError]);

  // Update loan transaction state
  useEffect(() => {
    if (createLoanHash) {
      setLoanTx({ status: 'pending', hash: createLoanHash });
    }
  }, [createLoanHash]);

  useEffect(() => {
    if (isCreateLoanSuccess) {
      setLoanTx(prev => ({ ...prev, status: 'success' }));
      refetchBalance();
      setAmount("");
    }
  }, [isCreateLoanSuccess, refetchBalance]);

  useEffect(() => {
    if (isCreateLoanError) {
      setLoanTx(prev => ({ ...prev, status: 'error', error: 'Loan creation failed' }));
    }
  }, [isCreateLoanError]);

  const needsApproval = useMemo(() => {
    if (!allowance) return true;
    return amountRaw > allowance;
  }, [allowance, amountRaw]);

  const isValidAmount = useMemo(() => {
    return !validationError && amountRaw > BigInt(0);
  }, [validationError, amountRaw]);

  const handleApprove = useCallback(async () => {
    if (!address || !isValidAmount) return;
    setApprovalTx({ status: 'idle' });
    
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
      const errorMessage = getTransactionErrorMessage(err);
      setApprovalTx({ status: 'error', error: errorMessage });
    }
  }, [address, isValidAmount, approve]);

  const handleCreateLoan = useCallback(async () => {
    if (!address || !isValidAmount) return;
    if (needsApproval) {
      setLoanTx({ status: 'error', error: 'Please approve USDC first' });
      return;
    }
    setLoanTx({ status: 'idle' });
    
    try {
      await createLoan({
        ...CONTRACT_CONFIGS.LOAN_MANAGER,
        functionName: "createLoan",
        args: [amountRaw],
      });
    } catch (err: unknown) {
      console.error("CreateLoan error:", err);
      const errorMessage = getTransactionErrorMessage(err);
      setLoanTx({ status: 'error', error: errorMessage });
    }
  }, [address, isValidAmount, needsApproval, createLoan, amountRaw]);

  const resetTransactionStates = useCallback(() => {
    setApprovalTx({ status: 'idle' });
    setLoanTx({ status: 'idle' });
    setValidationError("");
  }, []);

  return {
    amount,
    setAmount,
    validationError,
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
    approvalTx,
    loanTx,
    handleApprove,
    handleCreateLoan,
    resetTransactionStates,
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
        marginAmount: loanInfoRaw.marginAmount,
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
  const [repayTx, setRepayTx] = useState<TransactionState>({ status: 'idle' });

  // Repay transaction
  const { writeContract: repayLoan, data: repayHash } = useWriteContract();
  const { isLoading: isRepayingTx, isSuccess: isRepayTxSuccess, isError: isRepayTxError } = 
    useWaitForTransactionReceipt({ hash: repayHash });

  // Update repay transaction state
  useEffect(() => {
    if (repayHash) {
      setRepayTx({ status: 'pending', hash: repayHash });
    }
  }, [repayHash]);

  useEffect(() => {
    if (isRepayTxSuccess) {
      setRepayTx(prev => ({ ...prev, status: 'success' }));
    }
  }, [isRepayTxSuccess]);

  useEffect(() => {
    if (isRepayTxError) {
      setRepayTx(prev => ({ ...prev, status: 'error', error: 'Repay failed' }));
    }
  }, [isRepayTxError]);

  const handleRepay = useCallback(async () => {
    setRepayTx({ status: 'idle' });
    try {
      await repayLoan({
        ...CONTRACT_CONFIGS.LOAN_MANAGER,
        functionName: "repayLoan",
        args: [],
      });
    } catch (err: unknown) {
      console.error("Repay error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Repay failed';
      setRepayTx({ status: 'error', error: errorMessage });
    }
  }, [repayLoan]);

  const resetTransactionState = useCallback(() => {
    setRepayTx({ status: 'idle' });
  }, []);

  return {
    handleRepay,
    repayTx,
    isRepaying: isRepayingTx,
    isRepaySuccess: isRepayTxSuccess,
    resetTransactionState,
  };
};
