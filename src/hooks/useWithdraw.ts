import { useState, useCallback, useMemo, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUSDC, formatUSDC } from '@/utils/formatters';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { TransactionState } from '@/hooks/useLoan';

/**
 * Hook for handling token withdrawals from RestrictedWallet
 * Only available after loan is repaid
 */
export const useWithdraw = () => {
  const { address } = useAccount();
  const [withdrawTx, setWithdrawTx] = useState<TransactionState>({ status: 'idle' });
  const [currentStep, setCurrentStep] = useState<'idle' | 'withdraw' | 'success'>('idle');

  // Get user's loan info to check if loan is repaid
  const { data: loanInfo, refetch: refetchLoanInfo } = useReadContract({
    ...CONTRACT_CONFIGS.LOAN_MANAGER,
    functionName: 'getLoanInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Check if user has repaid loan (loan is not active)
  const canWithdraw = useMemo(() => {
    if (!loanInfo) return false;
    
    // Handle both array and object formats
    const isActive = Array.isArray(loanInfo) ? loanInfo[5] : (loanInfo as unknown as { isActive: boolean }).isActive;
    const restrictedWallet = Array.isArray(loanInfo) ? loanInfo[4] : (loanInfo as unknown as { restrictedWallet: string }).restrictedWallet;
    
    return !isActive && restrictedWallet && restrictedWallet !== '0x0000000000000000000000000000000000000000';
  }, [loanInfo]);

  // Get restricted wallet address
  const restrictedWalletAddress = useMemo(() => {
    if (!loanInfo) return null;
    
    const walletAddress = Array.isArray(loanInfo) ? loanInfo[4] : (loanInfo as unknown as { restrictedWallet: string }).restrictedWallet;
    return walletAddress && walletAddress !== '0x0000000000000000000000000000000000000000' ? walletAddress : null;
  }, [loanInfo]);

  // Get token balance in restricted wallet
  const { data: tokenBalance, refetch: refetchBalance } = useReadContract({
    address: restrictedWalletAddress as `0x${string}`,
    abi: [
      {
        name: 'getBalance',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'token', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }],
      },
    ],
    functionName: 'getBalance',
    args: [CONTRACT_CONFIGS.MOCK_USDC.address],
    query: { 
      enabled: !!restrictedWalletAddress && canWithdraw 
    },
  });

  // Withdraw transaction
  const { writeContract: withdrawTokens, data: withdrawHash } = useWriteContract();
  const { isLoading: isWithdrawing, isSuccess: isWithdrawSuccess, isError: isWithdrawError } = 
    useWaitForTransactionReceipt({ hash: withdrawHash });

  // Update withdraw transaction state
  useEffect(() => {
    if (withdrawHash) {
      setWithdrawTx({ status: 'pending', hash: withdrawHash });
    }
  }, [withdrawHash]);

  useEffect(() => {
    if (isWithdrawSuccess) {
      setWithdrawTx(prev => ({ ...prev, status: 'success' }));
      setCurrentStep('success');
      refetchBalance();
      refetchLoanInfo();
    }
  }, [isWithdrawSuccess, refetchBalance, refetchLoanInfo]);

  useEffect(() => {
    if (isWithdrawError) {
      setWithdrawTx(prev => ({ ...prev, status: 'error', error: 'Withdraw failed' }));
      setCurrentStep('idle');
    }
  }, [isWithdrawError]);

  const handleWithdraw = useCallback(async (tokenAddress: string, amount: string) => {
    if (!restrictedWalletAddress || !canWithdraw) {
      throw new Error('Cannot withdraw: loan is still active or no restricted wallet');
    }

    setWithdrawTx({ status: 'idle' });
    setCurrentStep('withdraw');
    
    try {
      const amountWei = parseUSDC(amount);
      
      await withdrawTokens({
        address: restrictedWalletAddress as `0x${string}`,
        abi: [
          {
            name: 'withdrawTokens',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'token', type: 'address' },
              { name: 'amount', type: 'uint256' }
            ],
            outputs: [],
          },
        ],
        functionName: 'withdrawTokens',
        args: [tokenAddress as `0x${string}`, amountWei],
      });
    } catch (err: unknown) {
      console.error("Withdraw error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Withdraw failed';
      setWithdrawTx({ status: 'error', error: errorMessage });
      setCurrentStep('idle');
    }
  }, [withdrawTokens, restrictedWalletAddress, canWithdraw]);

  const resetTransactionState = useCallback(() => {
    setWithdrawTx({ status: 'idle' });
    setCurrentStep('idle');
  }, []);

  return {
    handleWithdraw,
    withdrawTx,
    currentStep,
    isWithdrawing,
    isWithdrawSuccess,
    canWithdraw,
    restrictedWalletAddress,
    tokenBalance: tokenBalance ? formatUSDC(tokenBalance) : '0',
    resetTransactionState,
  };
};