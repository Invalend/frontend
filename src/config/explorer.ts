import { SUPPORTED_CHAINS } from './contracts';

// Type for supported chain IDs
type SupportedChainId = typeof SUPPORTED_CHAINS[keyof typeof SUPPORTED_CHAINS];

// Blockchain explorer configurations
export const EXPLORER_CONFIGS = {
  [SUPPORTED_CHAINS.LISK_SEPOLIA]: {
    name: 'Lisk Sepolia Blockscout',
    baseUrl: 'https://sepolia-blockscout.lisk.com',
    txPath: '/tx',
    addressPath: '/address',
    tokenPath: '/token',
  },
} as const satisfies Record<SupportedChainId, {
  name: string;
  baseUrl: string;
  txPath: string;
  addressPath: string;
  tokenPath: string;
}>;

// Get explorer URL for transaction
export const getTransactionUrl = (hash: string, chainId: SupportedChainId = SUPPORTED_CHAINS.LISK_SEPOLIA): string => {
  const config = EXPLORER_CONFIGS[chainId];
  if (!config) return '';
  return `${config.baseUrl}${config.txPath}/${hash}`;
};

// Get explorer URL for address
export const getAddressUrl = (address: string, chainId: SupportedChainId = SUPPORTED_CHAINS.LISK_SEPOLIA): string => {
  const config = EXPLORER_CONFIGS[chainId];
  if (!config) return '';
  return `${config.baseUrl}${config.addressPath}/${address}`;
};

// Get explorer URL for token
export const getTokenUrl = (address: string, chainId: SupportedChainId = SUPPORTED_CHAINS.LISK_SEPOLIA): string => {
  const config = EXPLORER_CONFIGS[chainId];
  if (!config) return '';
  return `${config.baseUrl}${config.tokenPath}/${address}`;
};

// Get explorer config
export const getExplorerConfig = (chainId: SupportedChainId = SUPPORTED_CHAINS.LISK_SEPOLIA) => {
  return EXPLORER_CONFIGS[chainId];
};
