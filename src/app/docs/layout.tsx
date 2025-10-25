"use client";

import { useState } from 'react';
import { Menu, X, Lightbulb, Target, Cpu, Zap, GitBranch } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  available?: boolean;
}

const navigation: NavItem[] = [
  {
    title: 'Project Overview',
    icon: <Lightbulb className="w-4 h-4" />,
    children: [
      { title: 'Overview', href: '/docs/overview', available: true },
      { title: 'Problem & Solution', href: '/docs/problem-solution', available: true },
      { title: 'Features', href: '/docs/features', available: true }
    ]
  },
  {
    title: 'Core Concepts',
    icon: <Target className="w-4 h-4" />,
    children: [
      { title: 'Core Concept & Definition', href: '/docs/core-concept', available: true },
      { title: 'Core Principles', href: '/docs/core-principles', available: true },
      { title: 'Architecture', href: '/docs/architecture', available: true },
      { title: 'Core Flow', href: '/docs/core-flow', available: true }
    ]
  },
  {
    title: 'Technical Details',
    icon: <Cpu className="w-4 h-4" />,
    children: [
      { title: 'Smart Contracts', href: '/docs/smart-contracts', available: true },
      { title: 'Frontend Implementation', href: '/docs/frontend', available: true },
      { title: 'Integration Guide', href: '/docs/integration', available: true }
    ]
  },
  {
    title: 'Demo & Testing',
    icon: <Zap className="w-4 h-4" />,
    children: [
      { title: 'Live Demo', href: '/docs/demo', available: true },
      { title: 'User Journey', href: '/docs/user-journey', available: true }
    ]
  },
  {
    title: 'Hackathon Info',
    icon: <GitBranch className="w-4 h-4" />,
    children: [
      { title: 'Submission Details', href: '/docs/submission', available: true },
      { title: 'Innovation Points', href: '/docs/innovation', available: true },
      { title: 'Future Roadmap', href: '/docs/roadmap', available: true }
    ]
  }
];

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Project Overview', 'Core Concepts']);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const NavSection = ({ item }: { item: NavItem }) => {
    const isExpanded = expandedSections.includes(item.title);
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <button
            onClick={() => toggleSection(item.title)}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </div>
            {isExpanded ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
          
          {isExpanded && item.children && (
            <div className="ml-6 space-y-1">
              {item.children.map((child) => (
                <NavItem key={child.title} item={child} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return <NavItem item={item} />;
  };

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    const isAvailable = item.available !== false;

    if (!isAvailable) {
      return (
        <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-500 rounded-lg">
          <span>{item.title}</span>
          <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">Coming Soon</span>
        </div>
      );
    }

    if (!item.href || item.href === '#') {
      return (
        <div className="px-3 py-2 text-sm text-gray-500 rounded-lg">
          {item.title}
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
          isActive
            ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500'
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        }`}
      >
        {item.title}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-cyan-500 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-black rounded transform rotate-45"></div>
          </div>
          <span className="text-lg font-semibold text-white">Invalend</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavSection key={item.title} item={item} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(6, 182, 212, 0.15)' }}>
        <div className="text-xs text-center" style={{ color: '#737373' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span>Hackathon Project v1.0</span>
          </div>
          <p>Invalend Protocol</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 border-r z-30" style={{ 
        background: '#0A0A0A', 
        borderColor: 'rgba(6, 182, 212, 0.15)' 
      }}>
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 border-r z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          background: '#0A0A0A', 
          borderColor: 'rgba(6, 182, 212, 0.15)' 
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b" style={{ 
        background: '#0A0A0A', 
        borderColor: 'rgba(6, 182, 212, 0.15)' 
      }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-cyan-500 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-black rounded transform rotate-45"></div>
          </div>
          <span className="text-lg font-semibold text-white">Invalend</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-gray-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main content */}
      <main className="lg:ml-80 min-h-screen" style={{ background: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
