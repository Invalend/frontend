"use client";

import { ArrowRight, BookOpen, Shield, TrendingUp, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Custom counter animation hook
function useCounterAnimation({ startValue, endValue, isVisible, duration = 2000 }: { startValue: number, endValue: number, isVisible: boolean, duration?: number }) {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | undefined = undefined;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, startValue, endValue, duration]);

  return count;
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('hero-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const animatedTvl = useCounterAnimation({
    startValue: 0,
    endValue: 487234,
    isVisible
  });

  const animatedPositions = useCounterAnimation({
    startValue: 0,
    endValue: 12,
    isVisible
  });

  return (
    <section id="hero-section" className="min-h-screen relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Main Content */}
      <div className="flex items-center min-h-screen pt-14">
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.002]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        <div className="container relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full" 
                   style={{ 
                     background: '#141414', 
                     border: '1px solid rgba(6, 182, 212, 0.15)' 
                   }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#06B6D4' }} />
                <span style={{ 
                  fontSize: '12px', 
                  color: '#06B6D4',
                  fontWeight: '400'
                }}>
                  Live on Base Sepolia Testnet
                </span>
              </div>

              {/* Main Headline - Improved */}
              <div className="space-y-6">
                <h1 style={{ 
                  fontSize: '72px', 
                  fontWeight: '400',
                  letterSpacing: '-3px',
                  lineHeight: '1.05',
                  color: '#FFFFFF'
                }}>
                  Welcome to the <span style={{ color: '#06B6D4' }}>prefunding</span> era.
                  Leverage <span style={{ color: '#06B6D4' }}>redefined</span>
                  <br />
                  
                </h1>

                <p style={{ 
                  fontSize: '20px', 
                  lineHeight: '1.7',
                  color: '#A3A3A3',
                  fontWeight: '400',
                  maxWidth: '540px'
                }}>
                  DAOs, traders, and institutions access 5x leverage with just 20% collateral.
                  Community backs the rest. 
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                <Link 
                  href="/app"
                  className="flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 group"
                  style={{ 
                    background: '#06B6D4',
                    color: '#0A0A0A',
                    border: '1px solid #06B6D4',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  Launch App
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/docs"
                  className="flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 group"
                  style={{ 
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(6, 182, 212, 0.15)',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                  }}
                >
                  Documentation
                  <BookOpen className="w-5 h-5" />
                </Link>
              </div>

            </div>

            {/* Right Column - Flat Visualization - Simplified */}
            <div className="relative">
              
              {/* Main Container */}
              <div className="relative w-full h-[500px]">
                
                {/* Flat Stage */}
                <div className="absolute inset-0">
                  
                  {/* Bottom Platform - Community Pool */}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '400px',
                      height: '140px',
                      background: '#141414',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      borderRadius: '8px'
                    }}
                  />

                  {/* Central Pillar - Fund Flow */}
                  <div 
                    className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '2px',
                      height: '200px',
                      background: 'rgba(6, 182, 212, 0.15)'
                    }}
                  >
                    {/* Flowing particles inside */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full left-1/2 transform -translate-x-1/2"
                          style={{
                            background: '#06B6D4',
                            animation: `flowUp 3s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                            opacity: 0
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Top Platform - Institution */}
                  <div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '350px',
                      height: '120px',
                      background: '#141414',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      borderRadius: '8px'
                    }}
                  />

                  {/* Floating Info Cards - Cleaner */}
                  
                  {/* Card 1 - Community */}
                  <div 
                    className="absolute bottom-40 left-8"
                    style={{
                      background: '#141414',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      borderRadius: '8px',
                      padding: '20px',
                      minWidth: '180px'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                           style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
                        <Users className="w-5 h-5" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                      </div>
                      <div style={{ fontSize: '14px', color: '#A3A3A3' }}>Community</div>
                    </div>
                    <div style={{ fontSize: '40px', fontWeight: '400', color: '#FFFFFF', letterSpacing: '-2px' }}>
                      80%
                    </div>
                    <div style={{ fontSize: '13px', color: '#A3A3A3', marginTop: '4px' }}>
                      Pre-funded capital
                    </div>
                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
                      <div className="flex justify-between text-xs" style={{ color: '#A3A3A3' }}>
                        <span>Earn APY</span>
                        <span style={{ color: '#06B6D4', fontWeight: '400' }}>6.00%</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - Institution */}
                  <div 
                    className="absolute top-32 right-8"
                    style={{
                      background: '#141414',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      borderRadius: '8px',
                      padding: '20px',
                      minWidth: '180px'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                           style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
                        <TrendingUp className="w-5 h-5" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                      </div>
                      <div style={{ fontSize: '14px', color: '#A3A3A3' }}>Institution</div>
                    </div>
                    <div style={{ fontSize: '40px', fontWeight: '400', color: '#FFFFFF', letterSpacing: '-2px' }}>
                      5x
                    </div>
                    <div style={{ fontSize: '13px', color: '#A3A3A3', marginTop: '4px' }}>
                      Leverage multiple
                    </div>
                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
                      <div className="flex justify-between text-xs" style={{ color: '#A3A3A3' }}>
                        <span>Collateral</span>
                        <span style={{ color: '#06B6D4', fontWeight: '400' }}>20%</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - Security - Simplified */}
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      background: '#141414',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      borderRadius: '8px',
                      padding: '12px 16px'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                      <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: '400' }}>
                        Protected at 80%
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Live Stats - Bottom Right - Cleaner */}
              <div 
                className="absolute bottom-4 right-4 flex items-center gap-6 px-6 py-4 rounded-lg"
                style={{ 
                  background: '#141414',
                  border: '1px solid rgba(6, 182, 212, 0.15)'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: '#A3A3A3', marginBottom: '4px' }}>
                    Total Value Locked
                  </div>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: '400', 
                    color: '#FFFFFF', 
                    letterSpacing: '-1px'
                  }}>
                    ${animatedTvl.toLocaleString()}
                  </div>
                </div>
                
                <div style={{ width: '1px', height: '32px', background: 'rgba(6, 182, 212, 0.15)' }} />
                
                <div>
                  <div style={{ fontSize: '12px', color: '#A3A3A3', marginBottom: '4px' }}>
                    Active Positions
                  </div>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: '400', 
                    color: '#FFFFFF', 
                    letterSpacing: '-1px'
                  }}>
                    {animatedPositions}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flowUp {
          0% { bottom: 0; opacity: 0; }
          50% { opacity: 0.6; }
          100% { bottom: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}