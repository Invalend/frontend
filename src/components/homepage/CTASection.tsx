'use client';

import { ArrowRight, BookOpen, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    'Live on Base Sepolia',
    'Open Source',
    'Community Governed'
  ];

  return (
    <section id="cta" className="py-[200px] bg-primary relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container text-center relative z-10">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`max-w-[1000px] mx-auto ${
            isVisible ? 'animate-fade-in-scale' : 'opacity-0'
          }`}
        >
          {/* Heading */}
          <h2 className="text-h1 text-primary mb-8">
            Ready to experience<br />
            <span className="text-accent">shared-risk liquidity?</span>
          </h2>

          {/* Description */}
          <p className="text-body-lg text-secondary max-w-[700px] mx-auto mb-12">
            Join the future of on-chain credit. Whether you&apos;re an institution 
            seeking capital efficiency or an LP looking for yield, Invalend 
            provides the infrastructure.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-5 justify-center flex-wrap mb-16">
            <Link href="/app" className="btn-primary btn-lg">
              Launch App
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/docs" className="btn-secondary btn-lg">
              Read Documentation
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>

          {/* Features */}
          <div className="flex gap-12 justify-center flex-wrap">
            {features.map((feature, index) => (
              <div 
                key={feature}
                className="flex items-center gap-3 text-secondary"
                style={{ 
                  animationDelay: `${600 + (index * 100)}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Check className="w-5 h-5 text-accent" />
                <span className="text-body">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
