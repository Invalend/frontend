// Trading constants and token configurations for Base Sepolia network

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  price?: string;
  logo?: string;
  isNative?: boolean;
}

// Base Sepolia Token Addresses (from deployment documentation)
// Only deployed tokens: Mock USDC, Mock ETH, Mock BTC
export const TOKENS: Record<string, Token> = {
  USDC: {
    symbol: 'USDC',
    name: 'Mock USD Coin',
    address: '0x98Ca29e25df55BcE438a2F93013fB9790edaf342', // Mock USDC on Base Sepolia
    decimals: 6,
    price: '1.00',
  },
  ETH: {
    symbol: 'ETH',
    name: 'Mock Ethereum',
    address: '0x81Fd9CCE18aB4806de9C81a90e8366657b96bC38', // Mock ETH on Base Sepolia
    decimals: 18,
    price: '2,456.78',
  },
  BTC: {
    symbol: 'BTC',
    name: 'Mock Bitcoin',
    address: '0x10d0287b7997FD5276922cfd2946D1472682828b', // Mock BTC on Base Sepolia
    decimals: 8,
    price: '111,210.45',
  },
};

// Uniswap V4 Router (Base Sepolia)
export const UNISWAP_V4_ROUTER = '0x492E6456D9528771018DeB9E87ef7750EF184104';

// Fee tiers for Uniswap V4 pools (Base Sepolia)
export const FEE_TIERS = {
  LOW: 500,    // 0.05%
  MEDIUM: 3000, // 0.3%
  HIGH: 10000,  // 1%
} as const;

// V4 Pool Configuration (from deployment documentation)
// Only pools with deployed tokens: USDC, ETH, BTC
export const V4_POOLS = {
  USDC_ETH: {
    poolId: '0x82aa315190ba72c31a00655a3982a66cb9ead8cb97952ae0437665fe6e37ef02',
    currency0: '0x81Fd9CCE18aB4806de9C81a90e8366657b96bC38', // ETH
    currency1: '0x98Ca29e25df55BcE438a2F93013fB9790edaf342', // USDC
    fee: 3000,
    tickSpacing: 60,
  },
  USDC_BTC: {
    poolId: '0xc839bf388664a4981e411a9f33eb8e0a828592f5a419bce34e539641e600f2ee',
    currency0: '0x10d0287b7997FD5276922cfd2946D1472682828b', // BTC
    currency1: '0x98Ca29e25df55BcE438a2F93013fB9790edaf342', // USDC
    fee: 3000,
    tickSpacing: 60,
  },
  ETH_BTC: {
    poolId: '0xfd4810754a554cf52dd702e298fae2dd2d0aa120d73fcca9e0e7306c89cf111d',
    currency0: '0x10d0287b7997FD5276922cfd2946D1472682828b', // BTC
    currency1: '0x81Fd9CCE18aB4806de9C81a90e8366657b96bC38', // ETH
    fee: 3000,
    tickSpacing: 60,
  },
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
