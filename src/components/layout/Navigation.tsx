"use client";


type TabType = 'pool' | 'loans' | 'dashboard' | 'faucet';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Overview', description: 'User position summary' },
    { id: 'pool' as TabType, label: 'Earn / Pool', description: 'Deposit USDC, view TVL & APY' },
    { id: 'loans' as TabType, label: 'Borrow / Loans', description: 'Borrow, repay, view collateral' },
    { id: 'faucet' as TabType, label: 'Faucet', description: 'Get testnet tokens' },
  ];

  return (
    <nav className="bg-dark-gray border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-teal-400 text-teal-400'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold">{tab.label}</span>
                <span className="text-xs text-gray-400">{tab.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}; 