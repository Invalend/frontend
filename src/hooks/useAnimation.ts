'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { animations, type AnimationPreset, type AnimationDuration, type AnimationEasing, type AnimationDelay } from '@/design-tokens/animations';

interface UseAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  duration?: AnimationDuration | number;
  easing?: AnimationEasing | string;
  delay?: AnimationDelay | number;
  preset?: AnimationPreset;
  disabled?: boolean;
}

interface AnimationStyle {
  opacity: number;
  transform: string;
  transition: string;
  transitionDelay: string;
}

export function useAnimation(options: UseAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
    duration,
    easing,
    delay,
    preset = 'fadeIn',
    disabled = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Get animation values from preset or individual options
  const getAnimationValues = useCallback(() => {
    if (preset) {
      const presetValues = animations.presets[preset];
      return {
        duration: typeof duration === 'number' ? duration : presetValues.duration,
        easing: easing || presetValues.easing,
        delay: typeof delay === 'number' ? delay : presetValues.delay
      };
    }

    return {
      duration: typeof duration === 'number' ? duration : animations.duration[duration || 'normal'],
      easing: typeof easing === 'string' ? easing : animations.easing[easing || 'custom'],
      delay: typeof delay === 'number' ? delay : animations.delays[delay || 'none']
    };
  }, [preset, duration, easing, delay]);

  // Create animation style object
  const getAnimationStyle = useCallback((): AnimationStyle => {
    if (disabled) {
      return {
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'none',
        transitionDelay: '0ms'
      };
    }

    const { duration: animDuration, easing: animEasing, delay: animDelay } = getAnimationValues();
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all ${animDuration}ms ${animEasing}`,
      transitionDelay: `${animDelay}ms`
    };
  }, [isVisible, disabled, getAnimationValues]);

  // Intersection Observer setup
  useEffect(() => {
    if (disabled || hasTriggered) return;

    const element = ref.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
            observerRef.current?.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, disabled, hasTriggered]);

  // Reset function for re-triggering animations
  const reset = useCallback(() => {
    setIsVisible(false);
    setHasTriggered(false);
  }, []);

  // Force trigger function
  const trigger = useCallback(() => {
    setIsVisible(true);
    setHasTriggered(true);
  }, []);

  return {
    ref,
    isVisible,
    hasTriggered,
    animationStyle: getAnimationStyle(),
    reset,
    trigger
  };
}

// Specialized hooks for common use cases
export function useFadeIn(options: Omit<UseAnimationOptions, 'preset'> = {}) {
  return useAnimation({ ...options, preset: 'fadeIn' });
}

export function useSlideUp(options: Omit<UseAnimationOptions, 'preset'> = {}) {
  return useAnimation({ ...options, preset: 'slideUp' });
}

export function useScaleIn(options: Omit<UseAnimationOptions, 'preset'> = {}) {
  return useAnimation({ ...options, preset: 'scaleIn' });
}

export function useStaggeredAnimation(options: Omit<UseAnimationOptions, 'preset'> = {}) {
  return useAnimation({ ...options, preset: 'stagger' });
}


