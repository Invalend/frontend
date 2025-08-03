"use client";

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-black rounded transform rotate-45"></div>
          </div>
          <span className="text-lg font-semibold text-white">Invalend Docs</span>
        </div>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>

      <div className="lg:flex">
        {/* Sidebar */}
        <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

        {/* Main content */}
        <main className="flex-1 lg:ml-80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
