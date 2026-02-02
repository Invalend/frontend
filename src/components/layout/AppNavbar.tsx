'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ConnectWallet } from '../common/ConnectWallet';
import { navigationItems, type TabType } from '@/config/navigation';

interface AppNavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function AppNavbar({ activeTab, onTabChange }: AppNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (tab: TabType) => {
    return activeTab === tab;
  };

  const handleNavigation = (tab: TabType) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className="sticky top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[rgba(6,182,212,0.15)]"
        role="navigation"
        aria-label="Application navigation"
      >
        <div className="px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{ 
                  background: 'rgba(6, 182, 212, 0.1)', 
                  border: '1px solid rgba(6, 182, 212, 0.2)' 
                }}
              >
                <div 
                  className="w-5 h-5 rounded-sm transition-all duration-300 group-hover:scale-110"
                  style={{ background: '#06B6D4' }}
                />
              </div>
              <span 
                className="text-2xl font-normal tracking-[-0.5px] transition-colors duration-300 group-hover:text-[#06B6D4]"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Space Grotesk'
                }}
              >
                Invalend
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.id);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 group ${
                      active ? 'text-[#06B6D4]' : 'text-[#A3A3A3] hover:text-white'
                    }`}
                    style={{ fontFamily: 'Space Grotesk' }}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon 
                      className={`w-4 h-4 transition-all duration-300 ${
                        active ? 'text-[#06B6D4]' : 'text-[#A3A3A3] group-hover:text-white'
                      }`}
                      aria-hidden={true}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-normal">
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Active Indicator */}
                    {active && (
                      <div 
                        className="absolute inset-0 rounded-lg border transition-all duration-300"
                        style={{ borderColor: 'rgba(6, 182, 212, 0.15)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Connect Wallet & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Connect Wallet */}
              <div className="hidden sm:block">
                <ConnectWallet />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden w-6 h-6 transition-colors duration-300 hover:text-[#06B6D4]"
                style={{ color: '#FFFFFF' }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden={true} /> : <Menu className="w-6 h-6" aria-hidden={true} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-[rgba(6,182,212,0.15)]"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-6 sm:px-8 py-4 space-y-3">
              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.id);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                      active ? 'text-[#06B6D4] bg-[#1E1E1E]' : 'text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E]'
                    }`}
                    style={{ fontFamily: 'Space Grotesk' }}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon 
                      className={`w-4 h-4 transition-all duration-300 ${
                        active ? 'text-[#06B6D4]' : 'text-[#A3A3A3] group-hover:text-white'
                      }`}
                      aria-hidden={true}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-normal">
                        {item.label}
                      </span>
                      <span className="text-xs font-normal opacity-70">
                        {item.description}
                      </span>
                    </div>
                    {active && (
                      <ArrowRight className="w-4 h-4 ml-auto text-[#06B6D4]" aria-hidden={true} />
                    )}
                  </button>
                );
              })}

              {/* Mobile Connect Wallet */}
              <div className="pt-4 border-t border-[rgba(6,182,212,0.15)]">
                <ConnectWallet />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Skip to main content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#06B6D4] focus:text-[#0A0A0A] focus:rounded-lg focus:font-normal"
        style={{ fontFamily: 'Space Grotesk' }}
      >
        Skip to main content
      </a>
    </>
  );
}
