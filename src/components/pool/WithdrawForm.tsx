"use client";

import { useEffect } from 'react';
import { useWithdraw } from '@/hooks/useWithdraw';
import { TransactionButton } from '@/components/common/TransactionButton';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';

export const WithdrawForm = () => {
  const {
    amount,
    userInfo,
    withdrawableShares,
    isWithdrawing,
    isWithdrawSuccess,
    error,
    setError,
    handleAmountChange,
    handleMaxClick,
    handleWithdraw,
    resetStates,
    isValidAmount,
  } = useWithdraw();

  const hasShares = parseFloat(withdrawableShares) > 0;

  useEffect(() => {
    if (isWithdrawSuccess) {
      resetStates();
    }
  }, [isWithdrawSuccess, resetStates]);

  return (
    <div className="bg-black rounded-lg p-6 border border-gray-700">
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Withdraw USDC</h3>
          <p className="text-sm text-gray-400">
            Withdraw your shares and redeem USDC from the pool.
          </p>
        </div>

        {/* User Info */}
        {userInfo && (
          <div className="bg-dark-gray rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Your Shares</span>
              <span className="text-white font-medium">
                {userInfo.shares} Shares
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Asset Value</span>
              <span className="text-white font-medium">
                {userInfo.assetValue} USDC
              </span>
            </div>
          </div>
        )}

        {/* Withdrawable Info */}
        <div className="bg-dark-gray rounded-lg p-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Withdrawable Shares</span>
            <span className="text-white font-medium">
              {withdrawableShares} Shares
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            You can redeem your shares anytime. Asset value may fluctuate based on pool performance.
          </p>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Shares to Withdraw
          </label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                if (error) setError('');
                handleAmountChange(e);
              }}
              placeholder="0.00"
              disabled={!hasShares || isWithdrawing}
              className="w-full bg-dark-gray border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={handleMaxClick}
              disabled={!hasShares || isWithdrawing}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-teal-400 hover:text-teal-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              MAX
            </button>
          </div>
          {amount && !isValidAmount && (
            <p className="text-sm text-red-400">
              {parseFloat(amount) <= 0
                ? 'Amount must be greater than 0'
                : 'Amount exceeds your shares'}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <ErrorDisplay error={error} onRetry={() => setError('')} />
        )}

        {/* Transaction Feedback */}
        {isWithdrawing && (
          <div className="bg-dark-gray rounded-lg p-4 flex items-center space-x-3">
            <LoadingSpinner size="sm" />
            <div>
              <p className="text-sm text-white font-medium">Processing withdrawal...</p>
              <p className="text-xs text-gray-400">Please wait for confirmation.</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isWithdrawSuccess && (
          <div className="bg-teal-400/20 border border-teal-400/30 rounded-lg p-4">
            <p className="text-sm text-teal-400 font-medium">
              ✅ Withdrawal successful! USDC sent to your wallet.
            </p>
          </div>
        )}

        {/* Action Button */}
        <TransactionButton
          onClick={handleWithdraw}
          disabled={!isValidAmount || isWithdrawing || !hasShares}
          loading={isWithdrawing}
          size="lg"
          className="w-full"
        >
          {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
        </TransactionButton>

        {/* Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Redeem your shares anytime</p>
          <p>• Earned yield compounds within the pool</p>
          <p>• No withdrawal fees</p>
        </div>

        {/* Empty State */}
        {!hasShares && (
          <div className="bg-dark-gray rounded-lg p-4 text-center">
            <p className="text-sm text-gray-400">
              No shares found. Deposit USDC to start earning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
