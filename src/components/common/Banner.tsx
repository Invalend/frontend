import React from 'react';

export const Banner = () => {
  return (
    <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-4 relative z-[100]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center text-center gap-2 md:gap-3 text-base text-yellow-200">
        <span className="font-semibold text-yellow-400">Heads up 👋 Early Build</span>
        <span className="hidden md:inline text-yellow-500/30">|</span>
        <span>You’re viewing the Base Batches demo version of Invalend.</span>
        <span className="hidden md:inline text-yellow-500/30">|</span>
        <span className="text-yellow-200/80">The entire project is being fully rewritten from scratch.</span>
        <span className="hidden md:inline text-yellow-500/30">|</span>
        <a 
          href="https://x.com/invalend" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-semibold text-yellow-400 hover:text-yellow-300 underline decoration-yellow-400/50 hover:decoration-yellow-300 transition-colors"
        >
          Follow us on X @invalend
        </a>
      </div>
    </div>
  );
};
