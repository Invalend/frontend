import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { createStorage } from 'wagmi';

// Validate environment variables
const projectId = process.env.WALLET_CONNECT_PROJECT_ID;
if (!projectId) {
  console.warn('WALLET_CONNECT_PROJECT_ID not found');
}

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
        'https://sepolia.base.org'
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
  projectId: projectId || 'invalend-demo',
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