"use client";

import { usePool } from '@/hooks/usePool';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const PoolStats = () => {
  const { poolStats, isLoading } = usePool();

  if (isLoading) {
    return (
      <div className="bg-dark-gray rounded-lg p-6">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-gray-300">Loading pool stats...</span>
        </div>
      </div>
    );
  }

  if (!poolStats) {
    return (
      <div className="bg-dark-gray rounded-lg p-6">
        <div className="text-center text-gray-400">
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pool Overview</h2>
        <p className="text-gray-300">
          Deposit USDC to earn fixed 6% APY and provide liquidity for leverage loans
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-black rounded-lg p-4 border ${
              stat.highlight 
                ? 'border-teal-400 bg-gradient-to-br from-teal-400/10 to-transparent' 
                : 'border-gray-700'
            }`}
          >
            <div className="space-y-2">
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${
                  stat.highlight ? 'text-teal-400' : 'text-white'
                }`}>
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-sm text-gray-400">
                    {stat.unit}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pool Status */}
      <div className="bg-dark-gray rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Pool Status</h3>
            <p className="text-sm text-gray-400">
              {Number(poolStats.availableLiquidity) > 0 
                ? 'Pool is accepting deposits and funding loans'
                : 'Pool is at capacity'
              }
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            Number(poolStats.availableLiquidity) > 0
              ? 'bg-teal-400/20 text-teal-400'
              : 'bg-red-400/20 text-red-400'
          }`}>
            {Number(poolStats.availableLiquidity) > 0 ? 'Active' : 'Full'}
          </div>
        </div>
      </div>
    </div>
  );
}; 