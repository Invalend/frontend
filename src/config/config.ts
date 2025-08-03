import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { createStorage } from 'wagmi';

// Define Lisk Sepolia testnet - our primary and only supported chain
export const liskSepolia = defineChain({
  id: 4202,
  name: 'Lisk Sepolia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Lisk Sepolia Blockscout', url: 'https://sepolia-blockscout.lisk.com' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: 'Invalend',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'invalend',
  chains: [liskSepolia], // Only Lisk Sepolia supported
  ssr: false, // Disable SSR to fix connection persistence
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  }),
});