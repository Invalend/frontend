import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  Wallet, 
  BarChart3,
  Droplets,
  BookOpen
} from 'lucide-react';

export type TabType = "pool" | "loans" | "dashboard" | "faucet" | "trading" | "wallet" | "docs";

export interface NavigationItem {
  id: TabType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  href?: string;
}

export const navigationItems: NavigationItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    description: 'Overview',
    icon: LayoutDashboard
  },
  { 
    id: 'pool', 
    label: 'Earn', 
    description: 'Liquidity Pool',
    icon: TrendingUp
  },
  { 
    id: 'loans', 
    label: 'Borrow', 
    description: 'Leverage',
    icon: DollarSign
  },
  { 
    id: 'trading', 
    label: 'Trading', 
    description: 'DeFi Trading',
    icon: BarChart3
  },
  { 
    id: 'wallet', 
    label: 'Wallet', 
    description: 'Control',
    icon: Wallet
  },
  { 
    id: 'faucet', 
    label: 'Faucet', 
    description: 'Testnet',
    icon: Droplets
  },
  { 
    id: 'docs', 
    label: 'Docs', 
    description: 'Guide',
    icon: BookOpen,
    href: '/docs'
  }
];

export const getNavigationItem = (id: TabType): NavigationItem | undefined => {
  return navigationItems.find(item => item.id === id);
};

export const isNavigationItem = (id: string): id is TabType => {
  return navigationItems.some(item => item.id === id);
};
