import { parseUnits, encodeFunctionData } from 'viem';
import { V4_POOLS } from './constants';
import type { Token } from './constants';

// PoolKey struct for Uniswap V4 
export interface PoolKey {
  currency0: `0x${string}`;
  currency1: `0x${string}`;
  fee: number;
  tickSpacing: number;
  hooks: `0x${string}`;
}

// Swap parameters for V4
export interface SwapParams {
  poolKey: PoolKey;
  amountIn: bigint;
  amountOutMinimum: bigint;
  deadline: bigint;
}

/**
 * Build PoolKey struct for Uniswap V4
 */
export function buildPoolKey(tokenIn: Token, tokenOut: Token): PoolKey | null {
  // Find pool that matches the token pair
  const poolId = findPoolId(tokenIn, tokenOut);
  if (!poolId) return null;

  const pool = V4_POOLS[poolId as keyof typeof V4_POOLS];
  if (!pool) return null;

  return {
    currency0: pool.currency0 as `0x${string}`,
    currency1: pool.currency1 as `0x${string}`,
    fee: pool.fee,
    tickSpacing: pool.tickSpacing,
    hooks: '0x0000000000000000000000000000000000000000' as `0x${string}` // No hooks
  };
}

/**
 * Find pool ID berdasarkan token pair
 */
function findPoolId(tokenIn: Token, tokenOut: Token): string | null {
  const tokenInAddr = tokenIn.address.toLowerCase();
  const tokenOutAddr = tokenOut.address.toLowerCase();

  // Check USDC/ETH pool
  if (
    (tokenInAddr === V4_POOLS.USDC_ETH.currency0.toLowerCase() && tokenOutAddr === V4_POOLS.USDC_ETH.currency1.toLowerCase()) ||
    (tokenInAddr === V4_POOLS.USDC_ETH.currency1.toLowerCase() && tokenOutAddr === V4_POOLS.USDC_ETH.currency0.toLowerCase())
  ) {
    return 'USDC_ETH';
  }

  // Check USDC/BTC pool
  if (
    (tokenInAddr === V4_POOLS.USDC_BTC.currency0.toLowerCase() && tokenOutAddr === V4_POOLS.USDC_BTC.currency1.toLowerCase()) ||
    (tokenInAddr === V4_POOLS.USDC_BTC.currency1.toLowerCase() && tokenOutAddr === V4_POOLS.USDC_BTC.currency0.toLowerCase())
  ) {
    return 'USDC_BTC';
  }

  // Check ETH/BTC pool
  if (
    (tokenInAddr === V4_POOLS.ETH_BTC.currency0.toLowerCase() && tokenOutAddr === V4_POOLS.ETH_BTC.currency1.toLowerCase()) ||
    (tokenInAddr === V4_POOLS.ETH_BTC.currency1.toLowerCase() && tokenOutAddr === V4_POOLS.ETH_BTC.currency0.toLowerCase())
  ) {
    return 'ETH_BTC';
  }

  return null;
}

/**
 * Calculate minimum amount out dengan slippage protection
 */
export function calculateMinAmountOutV4(
  amountIn: string,
  tokenIn: Token,
  tokenOut: Token,
  slippagePercent: number
): bigint {
  if (!amountIn || !tokenIn.price || !tokenOut.price) return BigInt(0);

  // Convert prices to numbers (remove commas)
  const priceIn = parseFloat(tokenIn.price.replace(/,/g, ''));
  const priceOut = parseFloat(tokenOut.price.replace(/,/g, ''));
  
  // Calculate exchange rate
  const exchangeRate = priceIn / priceOut;
  
  // Apply slippage protection
  const slippageMultiplier = (100 - slippagePercent) / 100;
  
  // Calculate expected amount out
  const expectedAmountOut = parseFloat(amountIn) * exchangeRate * slippageMultiplier;
  
  // Convert to BigInt with correct decimals
  return parseUnits(expectedAmountOut.toFixed(tokenOut.decimals), tokenOut.decimals);
}

/**
 * Calculate deadline timestamp
 */
export function calculateDeadlineV4(minutesFromNow: number = 20): number {
  return Math.floor(Date.now() / 1000) + (minutesFromNow * 60);
}

/**
 * Encode swap data for Uniswap V4 Universal Router
 * Note: This is a simplified version for demo
 * Production implementation will require proper V4 router encoding
 */
export function encodeV4SwapData(swapParams: SwapParams): string {
  // For demo, we will use execute function with minimal data
  // Production implementation will require proper V4 router call encoding
  
  // Simulate swap data (this is a placeholder)
  // Real implementation will require proper V4 router encoding
  const swapData = encodeFunctionData({
    abi: [{
      name: 'swapExactInputSingleV4',
      type: 'function',
      inputs: [
        { name: 'poolKey', type: 'tuple', components: [
          { name: 'currency0', type: 'address' },
          { name: 'currency1', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'tickSpacing', type: 'int24' },
          { name: 'hooks', type: 'address' }
        ]},
        { name: 'amountIn', type: 'uint256' },
        { name: 'amountOutMinimum', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ],
      outputs: [{ name: 'amountOut', type: 'uint256' }],
      stateMutability: 'nonpayable'
    }],
    functionName: 'swapExactInputSingleV4',
    args: [
      swapParams.poolKey,
      swapParams.amountIn,
      swapParams.amountOutMinimum,
      swapParams.deadline
    ]
  });

  return swapData;
}

/**
 * Prepare swap parameters untuk V4 swap
 */
export function prepareSwapParams(
  tokenIn: Token,
  tokenOut: Token,
  amount: string,
  slippagePercent: number
): SwapParams | null {
  const poolKey = buildPoolKey(tokenIn, tokenOut);
  if (!poolKey) {
    throw new Error(`No pool found for ${tokenIn.symbol}/${tokenOut.symbol} pair`);
  }

  const amountIn = parseUnits(amount, tokenIn.decimals);
  const amountOutMinimum = calculateMinAmountOutV4(amount, tokenIn, tokenOut, slippagePercent);
  const deadline = BigInt(calculateDeadlineV4());

  return {
    poolKey,
    amountIn,
    amountOutMinimum,
    deadline
  };
}

/**
 * Check if token pair is supported
 */
export function isTokenPairSupported(tokenIn: Token, tokenOut: Token): boolean {
  return findPoolId(tokenIn, tokenOut) !== null;
}

/**
 * Get supported token pairs
 */
export function getSupportedTokenPairs(): Array<{tokenIn: string, tokenOut: string}> {
  return [
    { tokenIn: 'USDC', tokenOut: 'ETH' },
    { tokenIn: 'ETH', tokenOut: 'USDC' },
    { tokenIn: 'USDC', tokenOut: 'BTC' },
    { tokenIn: 'BTC', tokenOut: 'USDC' },
    { tokenIn: 'ETH', tokenOut: 'BTC' },
    { tokenIn: 'BTC', tokenOut: 'ETH' }
  ];
}
