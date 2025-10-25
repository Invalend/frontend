"use client";
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-[#0A0A0A] border-b border-[rgba(6,182,212,0.15)]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-16">
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
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-normal text-[#06B6D4] transition-colors duration-300 group-hover:text-[#06B6D4]" style={{ 
                fontFamily: 'Space Grotesk',
                letterSpacing: '-0.5px'
              }}>
                Invalend
              </h1>
              <span className="text-sm text-[#A3A3A3] bg-[#1E1E1E] px-3 py-1 rounded-lg border border-[rgba(6,182,212,0.15)]" style={{ fontFamily: 'Space Grotesk' }}>
                PoC
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}; 