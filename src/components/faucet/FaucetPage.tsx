"use client";

import { useEffect } from 'react';
import { useFaucet } from '@/hooks/useFaucet';
import { TransactionButton } from '@/components/common/TransactionButton';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { formatUSDC } from '@/utils/formatters';

export const FaucetPage = () => {
  const {
    usdcBalance,
    isMinting,    
    handleMint,
    resetStates,
    refetchBalance,
    mintHash,
  } = useFaucet();

  // Refetch balance after successful mint
  useEffect(() => {
    if (mintHash) {
      refetchBalance();
      resetStates();
    }
  }, [mintHash, refetchBalance, resetStates]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">MockUSDC Faucet</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Get test USDC tokens for the Invalend protocol. This faucet allows you to mint 
          1000 USDC tokens for testing purposes on Lisk Sepolia testnet.
        </p>
      </div>

      {/* Current Balance */}
      <div className="bg-black rounded-lg p-6 border border-gray-700">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">Your USDC Balance</h3>
          <div className="text-3xl font-bold text-teal-400">
            {usdcBalance ? formatUSDC(usdcBalance) : '0.00'} USDC
          </div>
          <p className="text-sm text-gray-400">
            Available for deposits and testing
          </p>
        </div>
      </div>

      {/* Mint Section */}
      <div className="bg-black rounded-lg p-6 border border-gray-700">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Mint Test USDC</h3>
            <p className="text-sm text-gray-400">
              Get 1000 USDC tokens for testing the protocol
            </p>
          </div>

          {/* Transaction Status */}
          {isMinting && (
            <div className="bg-dark-gray rounded-lg p-4">
              <div className="flex items-center justify-center space-x-3">
                <LoadingSpinner size="sm" />
                <div className="text-center">
                  <p className="text-sm text-white font-medium">
                    Minting USDC tokens...
                  </p>
                  <p className="text-xs text-gray-400">
                    Please wait for transaction confirmation
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {mintHash && !isMinting && (
            <div className="bg-teal-400/20 border border-teal-400/30 rounded-lg p-4 text-center">
              <p className="text-sm text-teal-400 font-medium">
                ✅ Successfully minted 1000 USDC! Your balance has been updated.
              </p>
            </div>
          )}

          {/* Mint Button */}
          <div className="text-center">
            <TransactionButton
              onClick={handleMint}
              disabled={isMinting}
              loading={isMinting}
              size="lg"
              className="px-8"
            >
              {isMinting ? 'Minting...' : 'Mint 1000 USDC'}
            </TransactionButton>
          </div>

          {/* Info */}
          <div className="bg-dark-gray rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-3">Faucet Information</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <p>• Mint 1000 USDC tokens per transaction</p>
              <p>• Tokens are for testing purposes only</p>
              <p>• No real value - Lisk Sepolia testnet</p>
              <p>• Use these tokens to test deposits and withdrawals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Network Info */}
      <div className="bg-dark-gray rounded-lg p-4 text-center">
        <p className="text-sm text-gray-400">
          <span className="text-teal-400 font-medium">Network:</span> Lisk Sepolia Testnet
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Make sure your wallet is connected to the correct network
        </p>
      </div>
    </div>
  );
}; 