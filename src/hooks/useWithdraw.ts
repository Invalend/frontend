"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { parseUSDC, formatUSDC } from '@/utils/formatters';

export const useWithdraw = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'idle' | 'withdraw' | 'success'>('idle');

  // Get user info (shares & asset value)
  const { data: userInfo, refetch: refetchUserInfo } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: 'getUserInfo',
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  // Withdraw transaction
  const { writeContract: redeem, data: withdrawHash } = useWriteContract();
  const { isLoading: isWithdrawingTx, isSuccess: isWithdrawSuccess, isError: isWithdrawError } = useWaitForTransactionReceipt({
    hash: withdrawHash,
  });

  // Effects for step management
  useEffect(() => {
    if (isWithdrawSuccess) {
      setCurrentStep('success');
      refetchUserInfo();
      setError('');
    }
  }, [isWithdrawSuccess, refetchUserInfo]);

  useEffect(() => {
    if (isWithdrawError) {
      setCurrentStep('idle');
      setError('Withdraw gagal. Silakan coba lagi.');
    }
  }, [isWithdrawError]);

  // Format user info
  const formattedUserInfo = userInfo ? {
    shares: formatUSDC(userInfo[0] as bigint),
    assetValue: formatUSDC(userInfo[1] as bigint),
  } : null;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  const handleMaxClick = () => {
    if (formattedUserInfo) {
      setAmount(formattedUserInfo.shares);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || !address) return;
    
    setCurrentStep('withdraw');
    setError('');

    try {
      const sharesToRedeem = parseUSDC(amount);

      await redeem({
        ...CONTRACT_CONFIGS.LENDING_POOL,
        functionName: 'redeem',
        args: [sharesToRedeem, address, address], // amount of shares, receiver, owner
      });
    } catch (err) {
      console.error('Withdraw error:', err);
      setError('Gagal melakukan withdraw. Coba lagi.');
      setCurrentStep('idle');
    }
  };

  const resetStates = () => {
    setAmount('');
    setError('');
    setCurrentStep('idle');
  };

  const isValidAmount = () => {
    if (!amount || !formattedUserInfo) return false;
    const amountNum = parseFloat(amount);
    const maxShares = parseFloat(formattedUserInfo.shares);
    return amountNum > 0 && amountNum <= maxShares;
  };

  const getWithdrawableShares = () => {
    if (!formattedUserInfo) return "0";
    return formattedUserInfo.shares;
  };

  return {
    amount,
    setAmount,
    userInfo: formattedUserInfo,
    withdrawableShares: getWithdrawableShares(),
    
    // Step Management
    currentStep,
    isWithdrawing: isWithdrawingTx,
    isWithdrawSuccess,
    
    handleAmountChange,
    handleMaxClick,
    handleWithdraw,
    resetStates,
    refetchUserInfo,
    withdrawHash,
    isValidAmount: isValidAmount(),
    error,
    setError,
  };
};
