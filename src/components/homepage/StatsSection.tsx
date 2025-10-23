'use client';

import { Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const animatedLeverage = useCounterAnimation({
    startValue: 0,
    endValue: 5,
    isVisible
  });

  const animatedCollateral = useCounterAnimation({
    startValue: 0,
    endValue: 20,
    isVisible
  });

  const animatedBacking = useCounterAnimation({
    startValue: 0,
    endValue: 80,
    isVisible
  });

  const animatedApy = useCounterAnimation({
    startValue: 0,
    endValue: 6,
    isVisible
  });

  const animatedTvl = useCounterAnimation({
    startValue: 0,
    endValue: 500,
    isVisible
  });

  const animatedPositions = useCounterAnimation({
    startValue: 0,
    endValue: 3,
    isVisible
  });

  const animatedUtilization = useCounterAnimation({
    startValue: 0,
    endValue: 45,
    isVisible
  });

  const stats = [
    {
      icon: Zap,
      value: animatedLeverage,
      suffix: 'x',
      label: 'Maximum Leverage'
    },
    {
      icon: Shield,
      value: animatedCollateral,
      suffix: '%',
      label: 'Borrower Collateral'
    },
    {
      icon: Users,
      value: animatedBacking,
      suffix: '%',
      label: 'Community Backing'
    },
    {
      icon: TrendingUp,
      prefix: '',
      value: animatedApy,
      suffix: '%',
      label: 'LP APY (Fixed)'
    }
  ];

  // Realistic MVP Stats with animations
  const protocolStats = {
    totalValueLocked: `$${animatedTvl}K`,
    activePositions: animatedPositions,
    averageLPReturn: `${animatedApy}%`,
    vaultUtilization: `${animatedUtilization}%`,
    lastLiquidation: "0 days ago",
    lpsBacking: 12,
    borrowersActive: 2
  };

  return (
    <section className="py-[160px] bg-secondary relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/8 to-transparent pointer-events-none" />
      
      <div className="container relative z-10">
        {/* Section Label */}
        <div className="text-center mb-16">
          <h2 className="text-h1 text-primary mb-4">Protocol Status</h2>
        </div>
        
        {/* Stats Grid */}
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${
            isVisible ? 'animate-fade-in-scale' : 'opacity-0'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-12 bg-tertiary border border-subtle rounded-lg transition-all duration-400 hover:border-accent hover:-translate-y-1"
              style={{ 
                animationDelay: `${(index + 1) * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-6 text-accent flex items-center justify-center">
                <stat.icon className="w-12 h-12" />
              </div>

              {/* Value */}
              <div className="text-6xl text-primary leading-none font-normal tracking-[-0.02em] mb-4">
                {stat.prefix && <span className="text-accent">{stat.prefix}</span>}
                <span>{stat.value}</span>
                <span className="text-accent">{stat.suffix}</span>
              </div>

              {/* Label */}
              <div className="text-body text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Protocol Stats */}
        <div 
          className={`mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isVisible ? 'animate-fade-in-scale' : 'opacity-0'
          }`}
          style={{ animationDelay: '800ms', animationFillMode: 'both' }}
        >
          {/* Total Value Locked */}
          <div className="text-center p-8 bg-secondary/50 border border-subtle rounded-xl">
            <div className="text-h2 text-accent mb-2">${animatedTvl}K</div>
            <div className="text-body text-secondary">Total Value Locked</div>
          </div>
          
          {/* Active Positions */}
          <div className="text-center p-8 bg-secondary/50 border border-subtle rounded-xl">
            <div className="text-h2 text-accent mb-2">{animatedPositions}</div>
            <div className="text-body text-secondary">Active Positions</div>
          </div>
          
          {/* Vault Utilization */}
          <div className="text-center p-8 bg-secondary/50 border border-subtle rounded-xl">
            <div className="text-h2 text-accent mb-2">{animatedUtilization}%</div>
            <div className="text-body text-secondary">Vault Utilization</div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary border border-accent/20 rounded-full">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-small text-secondary">
              Last liquidation: {protocolStats.lastLiquidation}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-small text-tertiary">
            <span>{protocolStats.lpsBacking} LPs backing</span>
            <span>•</span>
            <span>{protocolStats.borrowersActive} active borrowers</span>
            <span>•</span>
            <span>Principal protected</span>
          </div>
        </div>
      </div>
    </section>
  );
}
