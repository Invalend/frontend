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
    currentStep,
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
    <div className="bg-[#0A0A0A] rounded-lg p-8 border border-[rgba(6,182,212,0.15)]">
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h3 className="text-2xl font-normal text-white mb-3" style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>Withdraw USDC</h3>
          <p className="text-lg text-[#A3A3A3]" style={{ 
            fontFamily: 'Space Grotesk',
            lineHeight: '1.6'
          }}>
            Withdraw your shares and redeem USDC from the pool.
          </p>
        </div>

        {/* User Info */}
        {userInfo && (
          <div className="bg-[#1E1E1E] rounded-lg p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>Your Shares</span>
              <span className="text-white font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                {userInfo.shares} Shares
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>Asset Value</span>
              <span className="text-white font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                {userInfo.assetValue} USDC
              </span>
            </div>
          </div>
        )}

        {/* Withdrawable Info */}
        <div className="bg-[#1E1E1E] rounded-lg p-6">
          <div className="flex justify-between">
            <span className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>Withdrawable Shares</span>
            <span className="text-white font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              {withdrawableShares} Shares
            </span>
          </div>
          <p className="text-xs text-[#A3A3A3] mt-2 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
            You can redeem your shares anytime. Asset value may fluctuate based on pool performance.
          </p>
        </div>

        {/* Amount Input */}
        <div className="space-y-4">
          <label className="block text-sm font-normal text-[#A3A3A3]" style={{ fontFamily: 'Space Grotesk' }}>
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
              className="w-full bg-[#1E1E1E] border border-[rgba(6,182,212,0.15)] rounded-lg px-4 py-3 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#06B6D4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: 'Space Grotesk' }}
            />
            <button
              type="button"
              onClick={handleMaxClick}
              disabled={!hasShares || isWithdrawing}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#06B6D4] hover:text-[#06B6D4]/80 font-normal disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              MAX
            </button>
          </div>
          {amount && !isValidAmount && (
            <p className="text-sm text-red-400 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
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
          <div className="bg-[#1E1E1E] rounded-lg p-6 flex items-center space-x-4">
            <LoadingSpinner size="sm" />
            <div>
              <p className="text-sm text-white font-normal" style={{ fontFamily: 'Space Grotesk' }}>Processing withdrawal...</p>
              <p className="text-xs text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>Please wait for confirmation.</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {currentStep === 'success' && isWithdrawSuccess && (
          <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-lg p-6">
            <p className="text-sm text-[#06B6D4] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              ✅ Withdrawal berhasil! USDC telah dikirim ke wallet Anda.
            </p>
          </div>
        )}

        {/* Action Button */}
        <TransactionButton
          onClick={handleWithdraw}
          disabled={!isValidAmount || isWithdrawing || !hasShares || currentStep === 'success'}
          loading={isWithdrawing}
          size="lg"
          className="w-full"
        >
          {currentStep === 'withdraw' && isWithdrawing 
            ? 'Mengwithdraw...' 
            : currentStep === 'success' 
            ? 'Withdraw Berhasil!' 
            : 'Withdraw'}
        </TransactionButton>

        {/* Info */}
        <div className="text-xs text-[#A3A3A3] space-y-2 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
          <p>• Redeem your shares anytime</p>
          <p>• Earned yield compounds within the pool</p>
          <p>• No withdrawal fees</p>
        </div>

        {/* Empty State */}
        {!hasShares && (
          <div className="bg-[#1E1E1E] rounded-lg p-6 text-center">
            <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              No shares found. Deposit USDC to start earning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
