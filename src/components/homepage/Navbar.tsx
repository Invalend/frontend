'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setIsScrolled(currentScroll > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#architecture', label: 'Architecture' },
    { href: '#features', label: 'Features' },
    { href: '#use-cases', label: 'Use Cases' },
    { href: '/docs', label: 'Documentation' },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out ${
          isScrolled 
            ? 'px-6 pt-4' 
            : 'px-0 pt-0'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div 
            className={`transition-all duration-400 ease-in-out ${
              isScrolled 
                ? 'bg-[#0A0A0A]/90 backdrop-blur-[24px] shadow-[0_8px_40px_rgba(6,182,212,0.15)] rounded-2xl h-[72px]' 
                : 'bg-transparent backdrop-blur-0 shadow-none rounded-none h-[88px]'
            }`}
          style={{
            background: isScrolled 
              ? 'rgba(10, 10, 10, 0.85)' 
              : 'transparent',
            backdropFilter: isScrolled 
              ? 'blur(24px) saturate(180%)' 
              : 'none',
            WebkitBackdropFilter: isScrolled 
              ? 'blur(24px) saturate(180%)' 
              : 'none'
          }}
        >
          <div className="container h-full flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group transition-all duration-300 hover:opacity-80">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105" style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                <div className="w-5 h-5 rounded-sm transition-all duration-300 group-hover:scale-110" style={{ background: '#06B6D4' }}></div>
              </div>
              <span className="text-xl font-normal tracking-[-0.02em] transition-colors duration-300 group-hover:text-[#06B6D4]" style={{ color: '#FFFFFF' }}>
                Invalend
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12" role="menubar">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-300 text-base hover:opacity-80"
                  style={{ color: '#A3A3A3' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#06B6D4'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#A3A3A3'}
                  role="menuitem"
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Link href="/app" 
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 group"
                style={{ 
                  background: '#06B6D4',
                  color: '#0A0A0A',
                  border: '1px solid #06B6D4',
                  fontSize: '14px',
                  fontWeight: '400'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#06B6D4';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#06B6D4';
                  e.currentTarget.style.color = '#0A0A0A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Launch Invalend application"
              >
                Launch App
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-6 h-6"
              style={{ color: '#FFFFFF' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className={`md:hidden absolute top-full left-0 right-0 transition-all duration-700 ease-in-out ${
              isScrolled 
                ? 'px-6 pt-2' 
                : 'px-0 pt-0'
            }`}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div 
              className="rounded-2xl"
              style={{ 
                background: 'rgba(10, 10, 10, 0.95)', 
                backdropFilter: 'blur(24px)',
                boxShadow: '0 8px 40px rgba(6, 182, 212, 0.15)'
              }}
            >
              <div className="container py-6 space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block transition-colors duration-300 text-base hover:opacity-80"
                    style={{ color: '#A3A3A3' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#06B6D4'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#A3A3A3'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                  </a>
                ))}
                <Link 
                  href="/app" 
                  className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 group w-full justify-center"
                  style={{ 
                    background: '#06B6D4',
                    color: '#0A0A0A',
                    border: '1px solid #06B6D4',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#06B6D4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#06B6D4';
                    e.currentTarget.style.color = '#0A0A0A';
                  }}
                  aria-label="Launch Invalend application"
                >
                  Launch App
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
