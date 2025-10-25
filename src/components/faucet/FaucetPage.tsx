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
    <div className="w-full space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
        <h1 className="text-3xl font-normal text-white mb-4" style={{ 
          fontFamily: 'Space Grotesk',
          letterSpacing: '-0.5px',
          lineHeight: '1.2'
        }}>MockUSDC Faucet</h1>
        <p className="text-[#A3A3A3] max-w-2xl mx-auto text-lg" style={{ 
          fontFamily: 'Space Grotesk',
          lineHeight: '1.6'
        }}>
          Get test USDC tokens for the Invalend protocol. This faucet allows you to mint 
          1000 USDC tokens for testing purposes on Base Sepolia testnet.
        </p>
      </div>

      {/* Current Balance */}
      <div className="bg-[#141414] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-normal text-white" style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>Your USDC Balance</h3>
          <div className="text-3xl font-normal text-[#06B6D4]" style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '-1px'
          }}>
            {usdcBalance ? formatUSDC(usdcBalance) : '0.00'} USDC
          </div>
          <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
            Available for deposits and testing
          </p>
        </div>
      </div>

      {/* Mint Section */}
      <div className="bg-[#141414] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-normal text-white mb-2" style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '-0.5px',
              lineHeight: '1.2'
            }}>Mint Test USDC</h3>
            <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              Get 1000 USDC tokens for testing the protocol
            </p>
          </div>

          {/* Transaction Status */}
          {isMinting && (
            <div className="bg-[#1E1E1E] rounded-lg p-4">
              <div className="flex items-center justify-center space-x-3">
                <LoadingSpinner size="sm" />
                <div className="text-center">
                  <p className="text-sm text-white font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                    Minting USDC tokens...
                  </p>
                  <p className="text-xs text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                    Please wait for transaction confirmation
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {mintHash && !isMinting && (
            <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-lg p-4 text-center">
              <p className="text-sm text-[#06B6D4] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
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
          <div className="bg-[#1E1E1E] rounded-lg p-4">
            <h4 className="text-sm font-normal text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>Faucet Information</h4>
            <div className="text-xs text-[#A3A3A3] space-y-2 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              <p>• Mint 1000 USDC tokens per transaction</p>
              <p>• Tokens are for testing purposes only</p>
              <p>• No real value - Base Sepolia testnet</p>
              <p>• Use these tokens to test deposits and withdrawals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Network Info */}
      <div className="bg-[#1E1E1E] rounded-lg p-4 text-center">
        <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
          <span className="text-[#06B6D4] font-normal">Network:</span> Base Sepolia Testnet
        </p>
        <p className="text-xs text-[#A3A3A3] mt-1 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
          Make sure your wallet is connected to the correct network
        </p>
      </div>
      </div>
    </div>
  );
}; 