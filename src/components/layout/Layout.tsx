"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { PoolPage } from "@/components/pool/PoolPage";
import { FaucetPage } from "@/components/faucet/FaucetPage";
import { TradingPage } from "@/components/trading";
import { BorrowForm, RepayForm } from "@/components/pool/Loanform";
import { PoolStats } from "@/components/pool/PoolStats";
import { RestrictedWalletPage } from "@/components/wallet/RestrictedWalletPage";
import { usePool } from "@/hooks/usePool";
import { useWithdraw } from "@/hooks/useWithdraw";
import { TransactionButton } from "@/components/common/TransactionButton";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

type TabType = "pool" | "loans" | "dashboard" | "faucet" | "trading" | "wallet" | "docs";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  
  // Get real data for dashboard
  const { poolStats, userInfo, isLoading: isLoadingPool } = usePool();
  const {
    amount: withdrawAmount,
    setAmount: setWithdrawAmount,
    isWithdrawing,
    handleWithdraw,
    isValidAmount: isValidWithdrawAmount,
    withdrawableShares,
  } = useWithdraw();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="w-full ">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div className="bg-black rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Welcome to Invalend</h1>
                  <p className="text-gray-400 mt-1">Your decentralized lending & trading platform</p>
                </div>
                <div className="bg-teal-400/20 text-teal-400 px-3 py-1 rounded-full text-sm font-medium">
                  Beta
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">Total Value Locked</div>
                  <div className="text-white font-bold text-xl">$2.4M</div>
                  <div className="text-teal-400 text-xs">+12.5% this month</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-1">Active Loans</div>
                  <div className="text-white font-bold text-xl">156</div>
                  <div className="text-teal-400 text-xs">8 new today</div>
                </div>
                <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-lg p-4 border border-teal-500/30">
                  <div className="text-gray-400 text-sm mb-1">Current APY</div>
                  <div className="text-teal-400 font-bold text-xl">6.2%</div>
                  <div className="text-teal-400/70 text-xs">Fixed rate</div>
                </div>
              </div>
            </div>

            {/* Pool Overview */}
            <div className="bg-black rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
                Lending Pool Overview
              </h2>
              <PoolStats />
            </div>
            
            {/* Your Portfolio */}
            <div className="bg-black rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                  </svg>
                </div>
                Your Portfolio
              </h2>
              
              {/* Portfolio Tabs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lending Position */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Lending Position</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-gray-400 text-sm mb-1">USDC Deposited</div>
                      <div className="text-white font-bold text-lg">
                        {isLoadingPool ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          `$${userInfo?.shares || "0"}`
                        )}
                      </div>
                      <div className="text-gray-500 text-xs">Available for lending</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-gray-400 text-sm mb-1">Asset Value</div>
                      <div className="text-teal-400 font-bold text-lg">
                        {isLoadingPool ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          `$${userInfo?.assetValue || "0"}`
                        )}
                      </div>
                      <div className="text-gray-500 text-xs">Current value with earnings</div>
                    </div>
                    <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-lg p-4 border border-teal-500/30">
                      <div className="text-gray-400 text-sm mb-1">Current APY</div>
                      <div className="text-teal-400 font-bold text-lg">
                        {isLoadingPool ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          `${poolStats?.apy || "0"}%`
                        )}
                      </div>
                      <div className="text-teal-400/70 text-xs">Annual yield</div>
                    </div>
                    
                    {/* Withdraw Section */}
                    {userInfo && parseFloat(userInfo.shares) > 0 && (
                      <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-white font-medium mb-3">Withdraw Funds</h4>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              Shares to Withdraw
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="0.00"
                                disabled={isWithdrawing}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-16"
                              />
                              <button
                                onClick={() => setWithdrawAmount(withdrawableShares)}
                                disabled={isWithdrawing}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium text-teal-400 hover:text-teal-300 border border-teal-500/30 rounded-md hover:border-teal-400/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Max
                              </button>
                            </div>
                            <div className="text-xs text-gray-400">
                              Available: {withdrawableShares} shares
                            </div>
                          </div>
                          <TransactionButton
                            onClick={handleWithdraw}
                            disabled={!isValidWithdrawAmount || isWithdrawing}
                            loading={isWithdrawing}
                            variant="secondary"
                            size="sm"
                            className="w-full"
                          >
                            {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                          </TransactionButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trading Position */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Trading Position</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-gray-400 text-sm mb-1">Active Loan</div>
                      <div className="text-white font-bold text-lg">$12,500</div>
                      <div className="text-gray-500 text-xs">Borrowed for trading</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="text-gray-400 text-sm mb-1">Collateral</div>
                      <div className="text-white font-bold text-lg">$2,500</div>
                      <div className="text-gray-500 text-xs">Margin requirement</div>
                    </div>
                    <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-lg p-4 border border-teal-500/30">
                      <div className="text-gray-400 text-sm mb-1">P&L</div>
                      <div className="text-teal-400 font-bold text-lg">+$387</div>
                      <div className="text-teal-400/70 text-xs">Unrealized gains</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        );
      case "pool":
        return <PoolPage />;
      case "loans":
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="bg-black rounded-xl border border-gray-700 p-0 max-w-md mx-auto">
                <LoanTabSwitch />
              </div>
            </div>
          </div>
        );
      case "faucet":
        return <FaucetPage />;
      case "trading":
        return <TradingPage />;
      case "wallet":
        return <RestrictedWalletPage />;
      case "docs":
        // Redirect to docs page or render docs component
        if (typeof window !== 'undefined') {
          window.open('/docs', '_blank');
        }
        return null;
      default:
        return <PoolPage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
    </div>
  );
};

// Loan Tab Switch Component
const LoanTabSwitch = () => {
  const [activeTab, setActiveTab] = useState<'borrow' | 'repay'>('borrow');
  
  return (
    <>
      <div className="flex border-b border-gray-700">
        <button
          className={`flex-1 py-3 text-center font-medium text-sm transition-colors rounded-tl-xl ${
            activeTab === 'borrow'
              ? 'text-teal-400 border-b-2 border-teal-400 bg-gray-800'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          onClick={() => setActiveTab('borrow')}
        >
          Borrow
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium text-sm transition-colors rounded-tr-xl ${
            activeTab === 'repay'
              ? 'text-teal-400 border-b-2 border-teal-400 bg-gray-800'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          onClick={() => setActiveTab('repay')}
        >
          Repay
        </button>
      </div>
      <div className="p-6">
        {activeTab === 'borrow' ? <BorrowForm /> : <RepayForm />}
      </div>
    </>
  );
};
