"use client";
import { config } from "@/config/config";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { useState, useEffect } from 'react';
import { ConnectionErrorBoundary } from '@/components/common/ConnectionErrorBoundary';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // Retry untuk network errors, tapi tidak untuk user rejection
          if (error?.message?.includes('User rejected')) return false;
          if (error?.message?.includes('Connection interrupted')) return true;
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        networkMode: 'offlineFirst',
      },
      mutations: {
        retry: (failureCount, error) => {
          if (error?.message?.includes('User rejected')) return false;
          if (error?.message?.includes('Connection interrupted')) return true;
          return failureCount < 2;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      },
    },
  }));

  // Ensure client-side mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Monitor connection health
    const handleConnectionError = (event: Event) => {
      console.warn('Connection error detected:', event);
    };
    
    const handleOnline = () => {
      console.log('Connection restored');
    };
    
    const handleOffline = () => {
      console.warn('Connection lost');
    };
    
    window.addEventListener('error', handleConnectionError);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('error', handleConnectionError);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConnectionErrorBoundary>
      <WagmiProvider 
        config={config} 
        reconnectOnMount={true}
      >
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#00A896',
              accentColorForeground: 'white',
              borderRadius: 'large',
              overlayBlur: 'small',
            })}
            initialChain={config.chains[0]} // Base Sepolia
            showRecentTransactions={true}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ConnectionErrorBoundary>
  );
};