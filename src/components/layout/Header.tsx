"use client";
import Link from 'next/link';
import { ConnectWallet } from '@/components/common/ConnectWallet';

export const Header = () => {
  return (
    <header className="bg-[#0A0A0A] border-b border-[rgba(6,182,212,0.15)]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-normal text-[#06B6D4]" style={{ 
                fontFamily: 'Space Grotesk',
                letterSpacing: '-0.5px'
              }}>
              Invalend
              </h1>
              <span className="ml-3 text-sm text-[#A3A3A3] bg-[#1E1E1E] px-3 py-1 rounded-lg border border-[rgba(6,182,212,0.15)]" style={{ fontFamily: 'Space Grotesk' }}>
              PoC
              </span>
            </Link>
          
          {/* Connect Wallet */}
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}; 