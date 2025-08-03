"use client";

import { ConnectWallet } from '@/components/common/ConnectWallet';

export const Header = () => {
  return (
    <header className="bg-black border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-teal-400">
              Invalend
            </h1>
            <span className="ml-2 text-sm text-gray-400 bg-dark-gray px-2 py-1 rounded">
              PoC
            </span>
          </div>
          
          {/* Connect Wallet */}
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}; 