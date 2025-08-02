"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { formatUSDC, formatAddress } from '@/utils/formatters';

export const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  
  // Get USDC balance
  const { data: usdcBalance } = useBalance({
    address,
    token: CONTRACT_CONFIGS.MOCK_USDC.address,
  });

  return (
    <div className="flex items-center gap-4">
      {isConnected && address && (
        <div className="flex items-center gap-3 text-sm">
          <div className="text-gray-300">
            {formatAddress(address)}
          </div>
          <div className="bg-dark-gray px-3 py-1 rounded-lg">
            <span className="text-teal-400 font-medium">
              {formatUSDC(usdcBalance?.value || 0)} USDC
            </span>
          </div>
        </div>
      )}
      <ConnectButton 
        showBalance={false}
        chainStatus="icon"
      />
    </div>
  );
}; 