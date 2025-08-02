import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia,mainnet,arbitrum, base} from 'viem/chains';
export const config = getDefaultConfig({
  appName: 'Invalend',
  projectId: process.env.WALLET_CONNECT_PROJECT_ID || 'invalend',
  chains: [arbitrumSepolia, mainnet, arbitrum, base],
  ssr: true,
});