import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { createStorage } from 'wagmi';

// Define Base Sepolia - our primary and only supported chain
export const baseSepolia = defineChain({
  id: 84532,
  name: 'Base Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [
        'https://sepolia.base.org',
        'https://base-sepolia.g.alchemy.com/v2/demo',
        'https://base-sepolia.infura.io/v3/demo'
      ],
    },
  },
  blockExplorers: {
    default: { name: 'Base Sepolia Blockscout', url: 'https://base-sepolia.blockscout.com' },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: 'Invalend',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'invalend-demo',
  chains: [baseSepolia], 
  ssr: false,
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  }),
  // Add connection timeout and retry settings
  batch: {
    multicall: {
      batchSize: 1024,
      wait: 16,
    },
  },
});