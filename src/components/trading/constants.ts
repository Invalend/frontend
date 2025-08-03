// Trading constants and token configurations for Lisk network

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  price?: string;
  logo?: string;
  isNative?: boolean;
}

// Lisk Sepolia Token Addresses 
export const TOKENS: Record<string, Token> = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000', // Native ETH
    decimals: 18,
    price: '2,456.78',
    isNative: true,
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xe61995e2728bd2d2b1abd9e089213b542db7916a', // Mock USDC on Lisk Sepolia (actual deployed address)
    decimals: 6,
    price: '1.00',
  },
  WBTC: {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x0000000000000000000000000000000000000000', 
    decimals: 8,
    price: '111,210.45',
  },
  LSK: {
    symbol: 'LSK',
    name: 'Lisk',
    address: '0x0000000000000000000000000000000000000000', 
    decimals: 18,
    price: '1.25',
  },
  UNI: {
    symbol: 'UNI',
    name: 'Uniswap',
    address: '0x0000000000000000000000000000000000000000', 
    decimals: 18,
    price: '8.45',
  },
};

// Uniswap V3 Router 
export const UNISWAP_V3_ROUTER = '0x0000000000000000000000000000000000000000';

// Fee tiers for Uniswap V3 pools
export const FEE_TIERS = {
  LOW: 500,    // 0.05%
  MEDIUM: 3000, // 0.3%
  HIGH: 10000,  // 1%
} as const;

// Default slippage options
export const SLIPPAGE_OPTIONS = ['0.1', '0.5', '1.0', '2.0'];

// Trading configuration
export const TRADING_CONFIG = {
  MAX_LEVERAGE: 5,
  MARGIN_REQUIREMENT: 0.2, // 20%
  DEFAULT_DEADLINE_MINUTES: 20,
  MIN_TRADE_AMOUNT: 1, // $1 USD minimum
  MAX_TRADE_AMOUNT: 100000, // $100k USD maximum
} as const;

// Transaction status types
export type TransactionStatus = 'idle' | 'pending' | 'confirming' | 'success' | 'error';

// Trade types
export type TradeType = 'buy' | 'sell';

// Swap types
export type SwapType = 'exactInput' | 'exactOutput';
