"use client";

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { parseUSDC, formatUSDC } from '@/utils/formatters';

export const useWithdraw = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [error, setError] = useState<string>('');

  // Get user info (shares & asset value)
  const { data: userInfo, refetch: refetchUserInfo } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: 'getUserInfo',
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  // Withdraw transaction
  const { writeContract: redeem, data: withdrawHash } = useWriteContract();
  const { isLoading: isWithdrawingTx, isSuccess: isWithdrawSuccess } = useWaitForTransactionReceipt({
    hash: withdrawHash,
  });

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
    
    setIsWithdrawing(true);
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
      setIsWithdrawing(false);
    }
  };

  const resetStates = () => {
    setAmount('');
    setIsWithdrawing(false);
    setError('');
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
    isWithdrawing: isWithdrawing || isWithdrawingTx,
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
