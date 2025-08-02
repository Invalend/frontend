"use client";

import { useAccount } from 'wagmi';
import { ConnectWallet } from '@/components/common/ConnectWallet';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const { isConnected } = useAccount();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative bg-black/90 backdrop-blur-sm border-b border-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors">
                Invalend
              </h1>
              <span className="ml-2 text-xs text-gray-400 bg-dark-gray px-2 py-1 rounded border border-teal-400/20">
                🚀 Hackathon PoC
              </span>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-12">
          {/* Hero Section */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-dark-gray/50 backdrop-blur-sm border border-teal-400/20 rounded-full px-4 py-2 text-sm text-teal-300">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                Built for ETH Global Hackathon 2025
              </div>
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-teal-400 to-white bg-clip-text text-transparent">
                Invalend Protocol
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Revolutionary DeFi leverage protocol with <span className="text-teal-400 font-semibold">20/80 pre-funding model</span> — maximizing capital efficiency while minimizing risk
              </p>
            </div>
            
            {/* Key Metrics */}
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Live on Arbitrum Sepolia</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <span className="text-teal-400 font-semibold">5x Leverage</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <span className="text-teal-400 font-semibold">6% Fixed APY</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {isConnected ? (
              <div className="space-y-6">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-teal-600 to-teal-400 text-black font-bold text-lg rounded-xl hover:from-teal-500 hover:to-teal-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-400/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Launch Protocol
                </Link>
                <div className="bg-gradient-to-r from-teal-400/10 to-transparent rounded-lg p-4 border border-teal-400/20">
                  <p className="text-teal-300 font-medium">
                    🎉 Wallet Connected! You're ready to experience the future of DeFi leverage
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-dark-gray/50 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-gray-700/50">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-600 to-teal-400 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      Connect Wallet to Begin
                    </h2>
                    <p className="text-gray-300">
                      Connect your wallet to access advanced DeFi features including deposits, withdrawals, and 5x leverage trading
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Innovation Highlights */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-dark-gray to-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/10">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">5x Leverage</h3>
              <p className="text-gray-300 text-sm">
                Maximize your trading potential with 5:1 leverage ratio using our innovative 20/80 funding model
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-dark-gray to-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/10">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Non-Custodial</h3>
              <p className="text-gray-300 text-sm">
                Your funds remain secure in restricted wallets designed specifically for Uniswap V3 interactions
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-dark-gray to-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/10">
              <div className="w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fixed 6% APY</h3>
              <p className="text-gray-300 text-sm">
                Predictable returns for liquidity providers with guaranteed 6% annual percentage yield
              </p>
            </div>
          </div>

          {/* Protocol Deep Dive */}
          <div className={`bg-gradient-to-br from-dark-gray/80 to-dark-gray/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-6xl mx-auto border border-gray-700/50 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Built for the Future of DeFi
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Invalend introduces a groundbreaking approach to leverage trading, combining capital efficiency with risk management through innovative smart contract architecture
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* How It Works */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-teal-400 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    How Invalend Works
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">User Contributes 20% Margin</h4>
                        <p className="text-gray-300">Traders provide 20% of the total position value in USDC as collateral, ensuring skin in the game while maximizing capital efficiency.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Protocol Provides 80% Funding</h4>
                        <p className="text-gray-300">Our liquidity pool automatically covers 80% of the position, enabling 5x leverage without traditional borrowing mechanisms.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Restricted Wallet Creation</h4>
                        <p className="text-gray-300">Funds are deployed in a restricted wallet that can only interact with Uniswap V3, ensuring security and preventing misuse.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Auto-Liquidation & Returns</h4>
                        <p className="text-gray-300">After 30 days, positions are automatically liquidated, profits/losses are calculated, and pool investors earn their guaranteed 6% APY.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Features */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-teal-400 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Technical Innovation
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-black/40 rounded-lg p-6 border border-teal-400/20">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                        Smart Contract Architecture
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• <strong className="text-teal-300">Modular Design:</strong> Separate contracts for lending, collateral, and loan management</li>
                        <li>• <strong className="text-teal-300">Gas Optimized:</strong> Efficient deployment and transaction costs</li>
                        <li>• <strong className="text-teal-300">Upgradeable:</strong> Future-proof design for protocol improvements</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/40 rounded-lg p-6 border border-teal-400/20">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                        Security Features
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• <strong className="text-teal-300">Restricted Wallets:</strong> Can only interact with approved Uniswap V3 contracts</li>
                        <li>• <strong className="text-teal-300">Time-locked Positions:</strong> 30-day auto-liquidation prevents indefinite exposure</li>
                        <li>• <strong className="text-teal-300">Collateral Management:</strong> Real-time monitoring and automated risk assessment</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/40 rounded-lg p-6 border border-teal-400/20">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                        Arbitrum Integration
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• <strong className="text-teal-300">Layer 2 Benefits:</strong> Fast transactions with minimal fees</li>
                        <li>• <strong className="text-teal-300">EVM Compatible:</strong> Full Ethereum tooling support</li>
                        <li>• <strong className="text-teal-300">Testnet Ready:</strong> Currently deployed on Arbitrum Sepolia</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hackathon Call to Action */}
          <div className={`bg-gradient-to-r from-teal-600/20 to-teal-400/20 backdrop-blur-sm rounded-2xl p-8 border border-teal-400/30 max-w-4xl mx-auto transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-600 to-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">
                🏆 Built for ETH Global Hackathon
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Experience the future of DeFi leverage trading. Invalend represents months of research, development, and innovation in decentralized finance.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full border border-teal-400/30">
                  Fully Functional PoC
                </span>
                <span className="bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full border border-teal-400/30">
                  Original Innovation
                </span>
                <span className="bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full border border-teal-400/30">
                  Production Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
