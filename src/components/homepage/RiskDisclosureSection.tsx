'use client';

import { Shield, AlertTriangle, Lock, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function RiskDisclosureSection() {
  const { ref, isVisible } = useScrollAnimation();

  const riskCategories = [
    {
      icon: Shield,
      title: 'Principal Protection',
      description: 'Principal protected via automated liquidation at 20% threshold',
      details: [
        'Liquidation triggers before LP capital is threatened',
        'Not suitable for speculative trading or high-risk strategies',
        'Automated risk management system'
      ],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      icon: AlertTriangle,
      title: 'Tail Risk Disclosure',
      description: 'Tail risk exists from oracle delays during extreme volatility',
      details: [
        'Historical analysis suggests 95%+ probability of full principal return',
        'Past performance does not guarantee future results',
        'Market volatility can impact liquidation timing'
      ],
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: Lock,
      title: 'Protocol Limitations',
      description: 'Single trading pair support (USDC-ETH only) in MVP',
      details: [
        'Manual borrower approval process',
        '30-day minimum lock period for LP deposits',
        'Limited to whitelisted protocols only'
      ],
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    }
  ];

  return (
    <section className="py-[200px] bg-tertiary">
      <div className="container">
        {/* Section Label */}
        <div 
          className={`section-label ${
            isVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          <div className="label-line"></div>
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Risk Considerations
          </span>
          <div className="label-line"></div>
        </div>

        {/* Heading */}
        <h2 
          className={`text-h1 text-primary text-center mb-8 ${
            isVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
        >
          Risk Considerations
        </h2>

        {/* Description */}
        <p 
          className={`text-body-lg text-secondary text-center max-w-[900px] mx-auto mb-20 ${
            isVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms', animationFillMode: 'both' }}
        >
          Understanding the risks and limitations of the Invalend protocol
        </p>

        {/* Risk Categories Grid */}
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${
            isVisible ? 'animate-fade-in-scale' : 'opacity-0'
          }`}
          style={{ animationDelay: '800ms', animationFillMode: 'both' }}
        >
          {riskCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.title}
                className={`p-8 rounded-xl border-2 ${category.borderColor} bg-gradient-to-br from-secondary/50 to-tertiary/30 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 ${
                  isVisible ? 'animate-fade-in-scale' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${1000 + (index * 150)}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${category.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${category.color}`} />
                </div>

                {/* Title */}
                <h3 className="text-h3 text-primary mb-4">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-body text-secondary mb-6">
                  {category.description}
                </p>

                {/* Details */}
                <ul className="space-y-3">
                  {category.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-small text-secondary">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Legal Disclaimer */}
        <div 
          className={`mt-16 p-8 bg-secondary/50 border border-subtle rounded-xl ${
            isVisible ? 'animate-fade-in-scale' : 'opacity-0'
          }`}
          style={{ animationDelay: '1400ms', animationFillMode: 'both' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-h4 text-primary mb-3">Important Legal Disclaimer</h4>
              <p className="text-body text-secondary leading-relaxed">
                This protocol involves financial risk. Past performance does not guarantee future results. 
                Users should only invest what they can afford to lose. The protocol is experimental and 
                may contain bugs or vulnerabilities. Please read our full terms of service and risk 
                disclosure before participating.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 ${
            isVisible ? 'animate-slide-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '1600ms', animationFillMode: 'both' }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
            <Shield className="w-5 h-5 text-accent" />
            <span className="text-small text-secondary">
              Always understand the risks before participating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
