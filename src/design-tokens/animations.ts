/**
 * Animation Design Tokens
 * Unified system for consistent animations across the application
 */

export const animations = {
  duration: {
    instant: 0,
    fast: 200,
    normal: 400,
    slow: 600,
    slower: 800,
    slowest: 1200,
    counter: 1500,
    hero: 2000
  },
  
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    custom: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
    easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
    easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  
  delays: {
    none: 0,
    fast: 100,
    normal: 200,
    slow: 400,
    slower: 600,
    slowest: 800,
    stagger: 150
  },
  
  // Predefined animation combinations
  presets: {
    fadeIn: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay: 0
    },
    slideUp: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay: 0
    },
    scaleIn: {
      duration: 400,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      delay: 0
    },
    counter: {
      duration: 1500,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      delay: 0
    },
    hero: {
      duration: 2000,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      delay: 0
    },
    stagger: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay: 150
    }
  }
} as const;

export type AnimationDuration = keyof typeof animations.duration;
export type AnimationEasing = keyof typeof animations.easing;
export type AnimationDelay = keyof typeof animations.delays;
export type AnimationPreset = keyof typeof animations.presets;

// Helper functions
export function getAnimationDuration(duration: AnimationDuration): number {
  return animations.duration[duration];
}

export function getAnimationEasing(easing: AnimationEasing): string {
  return animations.easing[easing];
}

export function getAnimationDelay(delay: AnimationDelay): number {
  return animations.delays[delay];
}

export function getAnimationPreset(preset: AnimationPreset) {
  return animations.presets[preset];
}

// CSS custom properties for runtime usage
export const animationCSSVars = {
  '--animation-duration-fast': `${animations.duration.fast}ms`,
  '--animation-duration-normal': `${animations.duration.normal}ms`,
  '--animation-duration-slow': `${animations.duration.slow}ms`,
  '--animation-duration-slower': `${animations.duration.slower}ms`,
  '--animation-duration-slowest': `${animations.duration.slowest}ms`,
  '--animation-duration-counter': `${animations.duration.counter}ms`,
  '--animation-duration-hero': `${animations.duration.hero}ms`,
  
  '--animation-easing-custom': animations.easing.custom,
  '--animation-easing-bounce': animations.easing.bounce,
  '--animation-easing-smooth': animations.easing.smooth,
  '--animation-easing-ease-out-quart': animations.easing.easeOutQuart,
  '--animation-easing-ease-out-cubic': animations.easing.easeOutCubic,
  '--animation-easing-ease-out-back': animations.easing.easeOutBack,
  
  '--animation-delay-fast': `${animations.delays.fast}ms`,
  '--animation-delay-normal': `${animations.delays.normal}ms`,
  '--animation-delay-slow': `${animations.delays.slow}ms`,
  '--animation-delay-slower': `${animations.delays.slower}ms`,
  '--animation-delay-slowest': `${animations.delays.slowest}ms`,
  '--animation-delay-stagger': `${animations.delays.stagger}ms`
} as const;


