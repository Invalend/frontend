import { useState, useEffect, useCallback } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits } from 'viem';
import { RESTRICTED_WALLET_ABI } from '@/abis/restricted-wallet-abi';
import { useUserLoanInfo } from './useLoan';

interface TransactionState {
  status: 'idle' | 'pending' | 'success' | 'error';
  hash?: string;
  error?: string;
}

export const useRestrictedWallet = () => {
  const { loanInfo } = useUserLoanInfo();
  const [withdrawTx, setWithdrawTx] = useState<TransactionState>({ status: 'idle' });

  // Get restricted wallet address from loan info
  const restrictedWalletAddress = loanInfo?.restrictedWallet || null;
  const hasRestrictedWallet = !!(restrictedWalletAddress && restrictedWalletAddress !== '0x0000000000000000000000000000000000000000');
  const loanIsActive = loanInfo?.isActive || false;

  // Withdraw transaction
  const { writeContract: withdrawFromWallet, data: withdrawHash } = useWriteContract();
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
    }
  }, [isWithdrawSuccess]);

  useEffect(() => {
    if (isWithdrawError) {
      setWithdrawTx(prev => ({ ...prev, status: 'error', error: 'Withdrawal failed' }));
    }
  }, [isWithdrawError]);

  // Get token balance in restricted wallet
  // Custom hook for balance checking
  const useRestrictedWalletBalance = (tokenAddress: string) => {
    return useReadContract({
      address: tokenAddress as `0x${string}`,
      abi: [
        {
          name: 'balanceOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'account', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }],
        },
      ],
      functionName: 'balanceOf',
      args: restrictedWalletAddress ? [restrictedWalletAddress as `0x${string}`] : undefined,
      query: { enabled: !!restrictedWalletAddress },
    });
  };

  // Withdraw specific amount from restricted wallet
  const withdrawToken = useCallback(async (tokenAddress: string, amount: string, decimals: number) => {
    if (!restrictedWalletAddress || loanIsActive) {
      throw new Error('Cannot withdraw: loan is still active or no restricted wallet');
    }

    setWithdrawTx({ status: 'idle' });
    try {
      const amountBigInt = parseUnits(amount, decimals);
      await withdrawFromWallet({
        address: restrictedWalletAddress as `0x${string}`,
        abi: RESTRICTED_WALLET_ABI,
        functionName: 'withdraw',
        args: [tokenAddress as `0x${string}`, amountBigInt],
      });
    } catch (err: unknown) {
      console.error('Withdraw error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Withdrawal failed';
      setWithdrawTx({ status: 'error', error: errorMessage });
    }
  }, [restrictedWalletAddress, loanIsActive, withdrawFromWallet]);

  // Withdraw all tokens from restricted wallet
  const withdrawAllTokens = useCallback(async (tokenAddress: string) => {
    if (!restrictedWalletAddress || loanIsActive) {
      throw new Error('Cannot withdraw: loan is still active or no restricted wallet');
    }

    setWithdrawTx({ status: 'idle' });
    try {
      await withdrawFromWallet({
        address: restrictedWalletAddress as `0x${string}`,
        abi: RESTRICTED_WALLET_ABI,
        functionName: 'withdrawAll',
        args: [tokenAddress as `0x${string}`],
      });
    } catch (err: unknown) {
      console.error('Withdraw all error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Withdrawal failed';
      setWithdrawTx({ status: 'error', error: errorMessage });
    }
  }, [restrictedWalletAddress, loanIsActive, withdrawFromWallet]);

  const resetTransactionState = useCallback(() => {
    setWithdrawTx({ status: 'idle' });
  }, []);

  return {
    restrictedWalletAddress,
    hasRestrictedWallet,
    loanIsActive,
    canWithdraw: hasRestrictedWallet && !loanIsActive,
    useRestrictedWalletBalance,
    withdrawToken,
    withdrawAllTokens,
    withdrawTx,
    isWithdrawing,
    resetTransactionState,
  };
};
