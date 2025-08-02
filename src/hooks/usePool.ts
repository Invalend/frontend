"use client";

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { formatUSDC, formatAPY } from '@/utils/formatters';

export const usePool = () => {
  const { address } = useAccount();

  // Pool liquidity & stats
  const { data: availableLiquidity, isLoading: isLoadingLiquidity } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: 'getAvailableLiquidity',
  });

  // Total Allocated (di luar pool, untuk loan)
  const { data: totalAllocated, isLoading: isLoadingAllocated } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: 'totalAllocated',
  });

  // Pool APY constant
  const { data: apy, isLoading: isLoadingApy } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: 'FIXED_APY',
  });

  // User-specific info (shares & asset value)
  const { data: userInfo, isLoading: isLoadingUser } = useReadContract({
    ...CONTRACT_CONFIGS.LENDING_POOL,
    functionName: 'getUserInfo',
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  const formattedStats = {
    availableLiquidity: availableLiquidity ? formatUSDC(availableLiquidity as bigint) : "0",
    totalAllocated: totalAllocated ? formatUSDC(totalAllocated as bigint) : "0",
    apy: apy ? formatAPY(apy as bigint) : "0",
  };

  const formattedUserInfo = userInfo ? {
    shares: formatUSDC(userInfo[0] as bigint),
    assetValue: formatUSDC(userInfo[1] as bigint),
  } : null;

  return {
    poolStats: formattedStats,
    userInfo: formattedUserInfo,
    isLoading: isLoadingLiquidity || isLoadingAllocated || isLoadingApy || isLoadingUser,
  };
};
