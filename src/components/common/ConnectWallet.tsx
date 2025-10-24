"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { formatUSDC } from '@/utils/formatters';

export const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  
  // Get USDC balance
  const { data: usdcBalance } = useBalance({
    address,
    token: CONTRACT_CONFIGS.MOCK_USDC.address,
  });

  return (
    <div className="flex items-center gap-3">
      {isConnected && address && (
        <div className="bg-[#1E1E1E] px-3 py-1.5 rounded-lg border border-[rgba(6,182,212,0.15)]">
          <span className="text-[#06B6D4] font-normal text-sm" style={{ fontFamily: 'Space Grotesk' }}>
            {formatUSDC(usdcBalance?.value || 0)} USDC
          </span>
        </div>
      )}
      <ConnectButton 
        showBalance={false}
        chainStatus="icon"
      />
    </div>
  );
}; 