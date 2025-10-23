"use client";

import { usePool } from '@/hooks/usePool';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const PoolStats = () => {
  const { poolStats, isLoading } = usePool();

  if (isLoading) {
    return (
      <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>Loading pool stats...</span>
        </div>
      </div>
    );
  }

  if (!poolStats) {
    return (
      <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
        <div className="text-center text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
          Failed to load pool statistics
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Deposits',
      value: poolStats.totalAllocated,
      unit: 'USDC',
      description: 'Total USDC deposited in pool',
    },
    {
      label: 'Available Liquidity',
      value: poolStats.availableLiquidity,
      unit: 'USDC',
      description: 'Available for new loans',
    },
    {
      label: 'Total Allocated',
      value: poolStats.totalAllocated,
      unit: 'USDC',
      description: 'Currently allocated to loans',
    },
    {
      label: 'APY',
      value: poolStats.apy,
      unit: '',
      description: 'Fixed annual yield rate',
      highlight: true,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Pool Description */}
      <p className="text-[#A3A3A3] text-sm mb-4 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
        Deposit USDC to earn fixed 6% APY and provide liquidity for leverage loans
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 border transition-all duration-300 ${
              stat.highlight 
                ? 'bg-[#06B6D4]/10 border-[#06B6D4]/30 hover:border-[#06B6D4]/50' 
                : 'bg-[#1E1E1E] border-[rgba(6,182,212,0.15)] hover:border-[rgba(6,182,212,0.3)]'
            }`}
          >
            <div className="space-y-2">
              <div className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                {stat.label}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-normal ${
                  stat.highlight ? 'text-[#06B6D4]' : 'text-white'
                }`} style={{ 
                  fontFamily: 'Space Grotesk',
                  letterSpacing: '-0.5px'
                }}>
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                    {stat.unit}
                  </span>
                )}
              </div>
              <div className="text-xs text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                {stat.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pool Status */}
      <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[rgba(6,182,212,0.15)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-normal" style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '-0.5px'
            }}>Pool Status</h3>
            <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              {Number(poolStats.availableLiquidity) > 0 
                ? 'Pool is accepting deposits and funding loans'
                : 'Pool is at capacity'
              }
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-normal ${
            Number(poolStats.availableLiquidity) > 0
              ? 'bg-[#06B6D4]/20 text-[#06B6D4]'
              : 'bg-red-400/20 text-red-400'
          }`} style={{ fontFamily: 'Space Grotesk' }}>
            {Number(poolStats.availableLiquidity) > 0 ? 'Active' : 'Full'}
          </div>
        </div>
      </div>
    </div>
  );
}; 