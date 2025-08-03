"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { PoolPage } from "@/components/pool/PoolPage";
import { FaucetPage } from "@/components/faucet/FaucetPage";
import { TradingPage } from "@/components/trading";
import { BorrowForm, RepayForm } from "@/components/pool/Loanform";
import { PoolStats } from "@/components/pool/PoolStats";

type TabType = "pool" | "loans" | "dashboard" | "faucet" | "trading";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div className="bg-dark-gray rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Pool Overview</h2>
              <PoolStats />
            </div>
            <div className="bg-dark-gray rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Your Position</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-1">Total Deposit</div>
                  <div className="text-white font-bold text-lg">-</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-1">Total Loans</div>
                  <div className="text-white font-bold text-lg">-</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-1">APY</div>
                  <div className="text-white font-bold text-lg">-</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-1">Health Status</div>
                  <div className="text-white font-bold text-lg">-</div>
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
              <div className="bg-dark-gray rounded-xl border border-gray-700 p-0 max-w-md mx-auto">
                <LoanTabSwitch />
              </div>
            </div>
          </div>
        );
      case "faucet":
        return <FaucetPage />;
      case "trading":
        return <TradingPage />;
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
