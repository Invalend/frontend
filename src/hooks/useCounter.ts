'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { animations, type AnimationDuration } from '@/design-tokens/animations';

interface UseCounterOptions {
  startValue: number;
  endValue: number;
  isVisible: boolean;
  duration?: AnimationDuration | number;
  easing?: 'easeOutQuart' | 'easeOutCubic' | 'easeOutBack' | 'linear';
  delay?: number;
  disabled?: boolean;
}

// Easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }
};

export function useCounter({
  startValue,
  endValue,
  isVisible,
  duration = 'counter',
  easing = 'easeOutQuart',
  delay = 0,
  disabled = false
}: UseCounterOptions) {
  const [count, setCount] = useState(startValue);
  const rafRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const isAnimatingRef = useRef(false);

  const getDuration = useCallback(() => {
    return typeof duration === 'number' ? duration : animations.duration[duration || 'counter'];
  }, [duration]);

  const animate = useCallback((currentTime: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = currentTime;
    }

    const elapsed = currentTime - startTimeRef.current;
    const totalDuration = getDuration();
    const progress = Math.min(elapsed / totalDuration, 1);

    // Apply easing function
    const easedProgress = easingFunctions[easing](progress);
    
    // Calculate current value
    const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
    setCount(currentValue);

    // Continue animation if not complete
    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Ensure final value is set
      setCount(endValue);
      isAnimatingRef.current = false;
    }
  }, [startValue, endValue, easing, getDuration]);

  // Start animation when visible
  useEffect(() => {
    if (disabled || !isVisible || isAnimatingRef.current) return;

    // Reset state
    setCount(startValue);
    startTimeRef.current = undefined;
    isAnimatingRef.current = true;

    // Apply delay if specified
    const timeoutId = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      isAnimatingRef.current = false;
    };
  }, [isVisible, startValue, endValue, delay, disabled, animate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return count;
}

// Specialized counter hooks for common use cases
export function useCounterWithDelay(
  startValue: number,
  endValue: number,
  isVisible: boolean,
  delay: number = 0
) {
  return useCounter({
    startValue,
    endValue,
    isVisible,
    duration: 'counter',
    easing: 'easeOutQuart',
    delay
  });
}

export function useFastCounter(
  startValue: number,
  endValue: number,
  isVisible: boolean
) {
  return useCounter({
    startValue,
    endValue,
    isVisible,
    duration: 'normal',
    easing: 'easeOutCubic'
  });
}

export function useSlowCounter(
  startValue: number,
  endValue: number,
  isVisible: boolean
) {
  return useCounter({
    startValue,
    endValue,
    isVisible,
    duration: 'hero',
    easing: 'easeOutBack'
  });
}


