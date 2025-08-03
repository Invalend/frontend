"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Shield, DollarSign, Zap, Users, Lock, Globe, ArrowRight, ExternalLink } from 'lucide-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLaunchApp = () => {
    router.push('/app');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse-glow" 
          style={{animationDuration: '4s'}}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400 rounded-full blur-3xl animate-pulse-glow" 
          style={{animationDuration: '6s', animationDelay: '2s'}}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-600 rounded-full blur-3xl animate-pulse-glow" 
          style={{animationDuration: '5s', animationDelay: '1s'}}
        ></div>
        
        {/* Floating particles */}
        <div 
          className="absolute top-20 left-20 w-3 h-3 bg-teal-500 rounded-full animate-float-particle opacity-80" 
          style={{animationDuration: '3s', animationDelay: '0s'}}
        ></div>
        <div 
          className="absolute top-40 right-32 w-2 h-2 bg-teal-400 rounded-full animate-float-particle opacity-70" 
          style={{animationDuration: '4s', animationDelay: '1s'}}
        ></div>
        <div 
          className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-teal-600 rounded-full animate-float-particle opacity-75" 
          style={{animationDuration: '3.5s', animationDelay: '2s'}}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-2 h-2 bg-teal-500 rounded-full animate-float-particle opacity-60" 
          style={{animationDuration: '2.5s', animationDelay: '0.5s'}}
        ></div>
        <div 
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-teal-300 rounded-full animate-float-particle opacity-50" 
          style={{animationDuration: '2.8s', animationDelay: '1.5s'}}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-teal-600 rounded-full animate-float-particle opacity-65" 
          style={{animationDuration: '3.2s', animationDelay: '0.8s'}}
        ></div>
        <div 
          className="absolute top-3/4 left-3/4 w-2 h-2 bg-teal-400 rounded-full animate-float-particle opacity-55" 
          style={{animationDuration: '3.8s', animationDelay: '1.2s'}}
        ></div>
        <div 
          className="absolute top-10 right-10 w-1.5 h-1.5 bg-teal-500 rounded-full animate-float-particle opacity-45" 
          style={{animationDuration: '2.2s', animationDelay: '2.5s'}}
        ></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-black rounded transform rotate-45"></div>
              </div>
              <h1 className="text-xl font-semibold text-teal-500">
                Invalend
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>Lisk Sepolia</span>
              </div>
              <button className="px-6 py-2 bg-teal-500 text-black font-medium rounded-lg hover:bg-teal-600 transition-colors" onClick={handleLaunchApp}>
                Launch dApp
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-20">
          {/* Hero Section */}
          <div className={`space-y-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-full px-5 py-2 text-sm text-gray-300 shadow-lg">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
          Decentralized Leverage Protocol
        </div>
        
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-white via-gray-200 to-teal-400 bg-clip-text text-transparent">
          Invalend Protocol
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-white font-semibold">Revolutionary DeFi leverage protocol</span> powered by <span className="text-teal-400 font-semibold">20/80 pre-funding model</span>
            <br />
            <span className="text-gray-400">Maximize capital efficiency, trade with confidence, earn with ease.</span>
          </p>
        </div>
        
        {/* Enhanced Metrics */}
        <div className="flex flex-wrap justify-center gap-10 text-sm mt-6">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-white font-semibold">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
          Live on Lisk
            </div>
            <span className="text-xs text-gray-500">Testnet</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-white font-semibold">
          <TrendingUp className="w-4 h-4 text-teal-500" />
          5x Leverage
            </div>
            <span className="text-xs text-gray-500">Maximum</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-white font-semibold">
          <DollarSign className="w-4 h-4 text-teal-500" />
          6% APY
            </div>
            <span className="text-xs text-gray-500">Fixed Rate</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-white font-semibold">
          <Shield className="w-4 h-4 text-teal-500" />
          Non-Custodial
            </div>
            <span className="text-xs text-gray-500">Your Keys</span>
          </div>
        </div>
          </div>

          {/* Enhanced CTA */}
          <div className={`transition-opacity duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-black font-semibold rounded-lg hover:from-white hover:to-gray-100 hover:shadow-lg hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg" onClick={handleLaunchApp}>
                <Zap className="w-5 h-5" />
                Launch Protocol
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                className="inline-flex items-center gap-2 px-6 py-4 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800/50 transition-colors cursor-not-allowed opacity-60"
                disabled
              >
                <Globe className="w-4 h-4" />
                View Documentation
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            
          </div>

          {/* Web3 Features Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-teal-500/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/30 transition-all">
                <TrendingUp className="w-6 h-6 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">5x Leverage Trading</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Amplify your positions with our innovative 20/80 funding model. Trade with 5:1 leverage while maintaining capital efficiency.
              </p>
              <div className="mt-4 text-xs text-teal-500 font-medium">DeFi Native</div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-teal-500/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/30 transition-all">
                <Shield className="w-6 h-6 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Self-Custody</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Funds secured in smart contract wallets with restricted functionality. Only Uniswap V3 interactions allowed.
              </p>
              <div className="mt-4 text-xs text-teal-500 font-medium">Trustless</div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-teal-500/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/30 transition-all">
                <DollarSign className="w-6 h-6 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fixed 6% APY</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Guaranteed 6% annual yield for liquidity providers. Earn passive income by supplying capital to the protocol.
              </p>
              <div className="mt-4 text-xs text-teal-500 font-medium">Yield Farming</div>
            </div>
          </div>

          {/* Protocol Stats */}
          <div className={`bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 transition-opacity duration-1000 delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white mb-8">Protocol Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$0</div>
                <div className="text-sm text-gray-400">Total Value Locked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">0</div>
                <div className="text-sm text-gray-400">Active Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$0</div>
                <div className="text-sm text-gray-400">Volume 24h</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">0</div>
                <div className="text-sm text-gray-400">Unique Users</div>
              </div>
            </div>
          </div>

          {/* How it Works - Enhanced */}
          <div className={`bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 transition-opacity duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold text-white mb-8">How Invalend Protocol Works</h2>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-800/80 rounded-lg p-1">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                    activeTab === 'overview' 
                      ? 'bg-white text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('technical')}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                    activeTab === 'technical' 
                      ? 'bg-white text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Technical
                </button>
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-white to-teal-400 text-black rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Connect Web3 Wallet</h4>
                      <p className="text-gray-400 text-sm">Connect your MetaMask, WalletConnect, or other Web3 wallet to interact with the protocol.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-white to-teal-400 text-black rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Deposit 20% Margin</h4>
                      <p className="text-gray-400 text-sm">Provide 20% of your desired position value as collateral in supported tokens.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-white to-teal-400 text-black rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Protocol Auto-Funds 80%</h4>
                      <p className="text-gray-400 text-sm">Liquidity pool automatically provides the remaining 80% from yield-earning depositors.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-white to-teal-400 text-black rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Smart Contract Execution</h4>
                      <p className="text-gray-400 text-sm">Funds deployed via restricted smart contract wallet, auto-liquidated after 30 days.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-teal-500" />
                      Smart Contract Security
                    </h4>
                    <p className="text-gray-400 text-sm">Funds are held in restricted smart contract wallets that can only interact with approved Uniswap V3 pools.</p>
                  </div>
                  <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-500" />
                      Liquidity Pool Model
                    </h4>
                    <p className="text-gray-400 text-sm">Decentralized liquidity pool where users can deposit assets to earn 6% APY by funding leverage positions.</p>
                  </div>
                </div>
                <div className="text-center p-6 bg-gray-800/40 rounded-lg border border-gray-700/30">
                  <h4 className="font-semibold text-white mb-2">Blockchain Integration</h4>
                  <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                    Built on Ethereum-compatible networks with Layer 2 scaling solutions. 
                    All transactions are transparent and verifiable on-chain.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Web3 Footer CTA */}
          <div className={`text-center py-8 transition-opacity duration-1000 delay-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to leverage your DeFi positions?</h3>
              <p className="text-gray-400 mb-6">Join the decentralized finance revolution with Invalend Protocol</p>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-white to-gray-200 text-black font-semibold rounded-lg hover:from-teal-500 hover:to-teal-600 hover:text-black transition-all duration-300 shadow-lg" onClick={handleLaunchApp}>
                <Zap className="w-4 h-4" />
                Connect Wallet & Start Trading
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}