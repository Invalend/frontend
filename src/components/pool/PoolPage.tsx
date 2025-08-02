"use client";

import { DepositForm } from "./DepositForm";
import { WithdrawForm } from "./WithdrawForm";
import { useState } from "react";

export const PoolPage = () => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  return (
    <div className="space-y-8">
      {/* Pool Actions */}
      <div className="space-y-6">
        <div className="bg-black rounded-lg border border-gray-700 p-0 max-w-md mx-auto">
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors rounded-tl-lg ${
                activeTab === "deposit"
                  ? "text-teal-400 border-b-2 border-teal-400 bg-gray-800"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("deposit")}
            >
              Deposit
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors rounded-tr-lg ${
                activeTab === "withdraw"
                  ? "text-teal-400 border-b-2 border-teal-400 bg-gray-800"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("withdraw")}
            >
              Withdraw
            </button>
          </div>
          <div className="p-6">
            {activeTab === "deposit" ? <DepositForm /> : <WithdrawForm />}
          </div>
        </div>
      </div>
    </div>
  );
};
