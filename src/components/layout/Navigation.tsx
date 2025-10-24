"use client";

import { navigationItems, type TabType } from '@/config/navigation';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {

  return (
    <nav className="bg-[#0A0A0A] border-b border-[rgba(6,182,212,0.15)]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-center">
          <div className="flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`relative px-6 py-4 text-base font-normal transition-colors group ${
                    activeTab === item.id ? 'text-[#06B6D4]' : 'text-[#A3A3A3] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="tracking-wide">{item.label}</span>
                    <span className={`text-xs font-normal transition-colors ${
                      activeTab === item.id ? 'text-[#06B6D4]' : 'text-[#A3A3A3]'
                    }`} style={{ fontFamily: 'Space Grotesk' }}>
                      {item.description}
                    </span>
                  </div>
                  {/* Active indicator: subtle 1px border per style guide */}
                  {activeTab === item.id && (
                    <div className="absolute inset-0 rounded-lg border border-[rgba(6,182,212,0.15)]"></div>
                  )}
                </button>
                
                {/* Separator */}
                {index < navigationItems.length - 1 && (
                  <div className="h-8 w-px bg-[rgba(6,182,212,0.15)] mx-0.5"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 