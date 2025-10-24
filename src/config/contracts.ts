// Auto-generated contract configuration
// Generated on: Fri Oct 24 22:31:11 WIB 2025
// Network: Base Sepolia (84532)

// Contract addresses - only for contracts without ABI files
export const CONTRACT_ADDRESSES = {
  // Uniswap V4 Contracts (no ABI files yet)
  POOL_MANAGER: "0x05E73354cFDd6745C338b50BcFDfA3Aa6fA03408",
  UNIVERSAL_ROUTER: "0x492E6456D9528771018DeB9E87ef7750EF184104",
  POSITION_MANAGER: "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80",
  PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3"
} as const;

export const NETWORK_CONFIG = {
  chainId: 84532,
  name: "Base Sepolia",
  rpcUrl: "https://sepolia.base.org",
  explorerUrl: "https://sepolia.basescan.org",
  blockExplorerUrl: "https://sepolia.basescan.org"
} as const;

export const POOL_IDS = {
  USDC_ETH: "0xb8c8ee21dc067700a8aca05a5c89af1b498bc9c4239718899080dd105a5ada32",
  USDC_BTC: "0x8c8647fb06835a711967f9ce23c5ef0a37352e3f15a1546e50066bc4c1ade76f",
  ETH_BTC: "0x64549200c3b190c572ade0fbfed337afbe56fa344e9fe0a3d744a1eeecf31dc9"
} as const;

// Supported chains configuration
export const SUPPORTED_CHAINS = {
  BASE_SEPOLIA: 84532,
} as const;

// Import ABI files and their addresses
import { MOCK_USDC_ABI, MOCK_USDC_ADDRESS } from '@/abis/mock-usdc-abi';
import { MOCK_ETH_ABI, MOCK_ETH_ADDRESS } from '@/abis/mock-eth-abi';
import { MOCK_BTC_ABI, MOCK_BTC_ADDRESS } from '@/abis/mock-btc-abi';
import { LENDING_POOL_ABI, LENDING_POOL_ADDRESS } from '@/abis/lending-pool-abi';
import { COLLATERAL_MANAGER_ABI, COLLATERAL_MANAGER_ADDRESS } from '@/abis/collateral-manager-abi';
import { LOAN_MANAGER_ABI, LOAN_MANAGER_ADDRESS } from '@/abis/loan-manager-abi';
import { RESTRICTED_WALLET_FACTORY_ABI, RESTRICTED_WALLET_FACTORY_ADDRESS } from '@/abis/restricted-wallet-factory-abi';

// Contract configurations for wagmi - using addresses from ABI files
export const CONTRACT_CONFIGS = {
  MOCK_USDC: {
    address: MOCK_USDC_ADDRESS as `0x${string}`,
    abi: MOCK_USDC_ABI,
  },
  MOCK_ETH: {
    address: MOCK_ETH_ADDRESS as `0x${string}`,
    abi: MOCK_ETH_ABI,
  },
  MOCK_BTC: {
    address: MOCK_BTC_ADDRESS as `0x${string}`,
    abi: MOCK_BTC_ABI,
  },
  LENDING_POOL: {
    address: LENDING_POOL_ADDRESS as `0x${string}`,
    abi: LENDING_POOL_ABI,
  },
  COLLATERAL_MANAGER: {
    address: COLLATERAL_MANAGER_ADDRESS as `0x${string}`,
    abi: COLLATERAL_MANAGER_ABI,
  },
  RESTRICTED_WALLET_FACTORY: {
    address: RESTRICTED_WALLET_FACTORY_ADDRESS as `0x${string}`,
    abi: RESTRICTED_WALLET_FACTORY_ABI,
  },
  LOAN_MANAGER: {
    address: LOAN_MANAGER_ADDRESS as `0x${string}`,
    abi: LOAN_MANAGER_ABI,
  },
  // Uniswap V4 contracts - keep using CONTRACT_ADDRESSES for now
  POOL_MANAGER: {
    address: CONTRACT_ADDRESSES.POOL_MANAGER as `0x${string}`,
    abi: [] as const, // ABI not available yet
  },
  UNIVERSAL_ROUTER: {
    address: CONTRACT_ADDRESSES.UNIVERSAL_ROUTER as `0x${string}`,
    abi: [] as const, // ABI not available yet
  },
  POSITION_MANAGER: {
    address: CONTRACT_ADDRESSES.POSITION_MANAGER as `0x${string}`,
    abi: [] as const, // ABI not available yet
  },
  PERMIT2: {
    address: CONTRACT_ADDRESSES.PERMIT2 as `0x${string}`,
    abi: [] as const, // ABI not available yet
  },
  // Pool IDs for V4 trading
  POOL_IDS: {
    USDC_ETH: POOL_IDS.USDC_ETH,
    USDC_BTC: POOL_IDS.USDC_BTC,
    ETH_BTC: POOL_IDS.ETH_BTC,
  },
} as const;
