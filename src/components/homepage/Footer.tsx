'use client';

import { Twitter, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    product: [
      { href: '#architecture', label: 'Architecture' },
      { href: '#features', label: 'Features' },
      { href: '#use-cases', label: 'Use Cases' },
      { href: '/app', label: 'Launch App' }
    ],
    resources: [
      { href: '/docs', label: 'Documentation' },
      { href: '/docs/overview', label: 'Overview' },
      { href: '/docs/core-concept', label: 'Core Concepts' },
      { href: '/docs/smart-contracts', label: 'Smart Contracts' }
    ],
    community: [
      { href: '#', label: 'Discord (coming soon)' },
      { href: '#', label: 'Twitter (coming soon)' },
      { href: '#', label: 'GitHub (coming soon)' },
      { href: '#', label: 'Governance (coming soon)' }
    ],
    legal: [
      { href: '#', label: 'Terms of Service (coming soon)' },
      { href: '#', label: 'Privacy Policy (coming soon)' },
      { href: '#', label: 'Security (coming soon)' },
      { href: '#', label: 'Brand Assets (coming soon)' }
    ]
  };

  return (
    <footer className="bg-secondary border-t border-subtle py-[80px] px-0">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 max-w-[320px]">
            <Link href="/" className="flex items-center gap-3 mb-5 group transition-all duration-300 hover:opacity-80">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <div className="w-5 h-5 bg-primary rounded-sm transition-all duration-300 group-hover:scale-110"></div>
              </div>
              <span className="text-xl text-primary transition-colors duration-300 group-hover:text-accent">Invalend</span>
            </Link>
            <p className="text-small text-tertiary leading-relaxed mb-8">
              Shared-risk liquidity infrastructure for on-chain institutions
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-subtle rounded-md text-secondary hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-subtle rounded-md text-secondary hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Discord"
              >
                <div className="w-5 h-5 bg-current rounded-sm"></div>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-subtle rounded-md text-secondary hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-subtle rounded-md text-secondary hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Mirror"
              >
                <div className="w-5 h-5 bg-current rounded-sm"></div>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-small text-primary uppercase tracking-wider mb-6 font-normal">
              Product
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-small text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-small text-primary uppercase tracking-wider mb-6 font-normal">
              Resources
            </h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-small text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="text-small text-primary uppercase tracking-wider mb-6 font-normal">
              Community
            </h4>
            <ul className="space-y-4">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-small text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-small text-primary uppercase tracking-wider mb-6 font-normal">
              Legal
            </h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-small text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 pt-8 border-t border-subtle">
          <p className="text-small text-tertiary">
            © 2025 Invalend. Built on Base.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-tertiary border border-subtle rounded-md text-xs text-secondary">
            <div className="w-4 h-4 bg-accent rounded-sm"></div>
            <span>Powered by Base</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
