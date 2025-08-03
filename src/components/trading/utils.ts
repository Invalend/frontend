import { parseUnits, formatUnits } from 'viem';
import { TOKENS, TRADING_CONFIG, FEE_TIERS } from './constants';
import type { Token } from './constants';

/**
 * Calculate the minimum amount out for a swap with slippage protection
 */
export function calculateMinAmountOut(
  amountIn: string,
  tokenIn: Token,
  tokenOut: Token,
  slippagePercent: number
): string {
  if (!amountIn || !tokenIn.price || !tokenOut.price) return '0';

  // Convert prices to numbers (remove commas)
  const priceIn = parseFloat(tokenIn.price.replace(/,/g, ''));
  const priceOut = parseFloat(tokenOut.price.replace(/,/g, ''));
  
  // Calculate exchange rate
  const exchangeRate = priceIn / priceOut;
  
  // Apply slippage protection
  const slippageMultiplier = (100 - slippagePercent) / 100;
  
  // Calculate expected amount out
  const expectedAmountOut = parseFloat(amountIn) * exchangeRate * slippageMultiplier;
  
  return expectedAmountOut.toFixed(tokenOut.decimals);
}

/**
 * Calculate the maximum amount in for an exact output swap
 */
export function calculateMaxAmountIn(
  amountOut: string,
  tokenIn: Token,
  tokenOut: Token,
  slippagePercent: number
): string {
  if (!amountOut || !tokenIn.price || !tokenOut.price) return '0';

  // Convert prices to numbers (remove commas)
  const priceIn = parseFloat(tokenIn.price.replace(/,/g, ''));
  const priceOut = parseFloat(tokenOut.price.replace(/,/g, ''));
  
  // Calculate exchange rate
  const exchangeRate = priceOut / priceIn;
  
  // Apply slippage buffer
  const slippageMultiplier = (100 + slippagePercent) / 100;
  
  // Calculate maximum amount in
  const maxAmountIn = parseFloat(amountOut) * exchangeRate * slippageMultiplier;
  
  return maxAmountIn.toFixed(tokenIn.decimals);
}

/**
 * Calculate USD value of a token amount
 */
export function calculateUSDValue(amount: string, token: Token): string {
  if (!amount || !token.price) return '0.00';
  
  const price = parseFloat(token.price.replace(/,/g, ''));
  const value = parseFloat(amount) * price;
  
  return value.toFixed(2);
}

/**
 * Calculate margin requirement for a trade
 */
export function calculateMarginRequired(tradeAmountUSD: string): string {
  if (!tradeAmountUSD) return '0.00';
  
  const margin = parseFloat(tradeAmountUSD) * TRADING_CONFIG.MARGIN_REQUIREMENT;
  return margin.toFixed(2);
}

/**
 * Calculate leverage multiplier for display
 */
export function getLeverageMultiplier(): number {
  return TRADING_CONFIG.MAX_LEVERAGE;
}

/**
 * Validate trade amount against limits
 */
export function validateTradeAmount(amount: string): {
  isValid: boolean;
  error?: string;
} {
  const amountNum = parseFloat(amount);
  
  if (!amount || isNaN(amountNum)) {
    return { isValid: false, error: 'Please enter a valid amount' };
  }
  
  if (amountNum < TRADING_CONFIG.MIN_TRADE_AMOUNT) {
    return { 
      isValid: false, 
      error: `Minimum trade amount is $${TRADING_CONFIG.MIN_TRADE_AMOUNT}` 
    };
  }
  
  if (amountNum > TRADING_CONFIG.MAX_TRADE_AMOUNT) {
    return { 
      isValid: false, 
      error: `Maximum trade amount is $${TRADING_CONFIG.MAX_TRADE_AMOUNT.toLocaleString()}` 
    };
  }
  
  return { isValid: true };
}

/**
 * Check if user has sufficient balance for margin
 */
export function hasSufficientBalance(
  userBalance: string,
  requiredMargin: string
): boolean {
  return parseFloat(userBalance) >= parseFloat(requiredMargin);
}

/**
 * Format token amount for display
 */
export function formatTokenAmount(
  amount: bigint | string,
  decimals: number,
  maxDecimals: number = 6
): string {
  let formattedAmount: string;
  
  if (typeof amount === 'bigint') {
    formattedAmount = formatUnits(amount, decimals);
  } else {
    formattedAmount = amount;
  }
  
  const num = parseFloat(formattedAmount);
  
  // For very small amounts, show more decimals
  if (num < 0.001 && num > 0) {
    return num.toFixed(8);
  }
  
  // For regular amounts, limit decimals
  return num.toFixed(Math.min(maxDecimals, decimals));
}

/**
 * Parse token amount to BigInt for contract calls
 */
export function parseTokenAmount(amount: string, decimals: number): bigint {
  return parseUnits(amount, decimals);
}

/**
 * Calculate deadline timestamp for transactions
 */
export function calculateDeadline(minutesFromNow: number = TRADING_CONFIG.DEFAULT_DEADLINE_MINUTES): number {
  return Math.floor(Date.now() / 1000) + (minutesFromNow * 60);
}

/**
 * Get recommended fee tier based on token pair
 */
export function getRecommendedFeeTier(tokenIn: Token, tokenOut: Token): keyof typeof FEE_TIERS {
  // LSK pairs might have lower liquidity, use higher fee tier
  if (tokenIn.symbol === 'LSK' || tokenOut.symbol === 'LSK') {
    return 'HIGH';
  }
  
  // Stable pairs (USDC involved) can use lower fees
  if (tokenIn.symbol === 'USDC' || tokenOut.symbol === 'USDC') {
    return 'MEDIUM';
  }
  
  // Default to medium fee tier
  return 'MEDIUM';
}

/**
 * Calculate estimated gas cost (placeholder - replace with actual gas estimation)
 */
export function estimateGasCost(): string {
  // This is a placeholder. In production, you would:
  // 1. Call estimateGas on the contract
  // 2. Get current gas price
  // 3. Calculate total cost in ETH
  return '0.005'; // ~$15 at current ETH prices
}

/**
 * Format price for display with appropriate decimals
 */
export function formatPrice(price: string): string {
  const num = parseFloat(price.replace(/,/g, ''));
  
  if (num >= 1000) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  } else if (num >= 1) {
    return num.toFixed(4);
  } else {
    return num.toFixed(6);
  }
}

/**
 * Get token by symbol
 */
export function getTokenBySymbol(symbol: string): Token | undefined {
  return TOKENS[symbol];
}

/**
 * Validate slippage percentage
 */
export function validateSlippage(slippage: string): {
  isValid: boolean;
  error?: string;
} {
  const slippageNum = parseFloat(slippage);
  
  if (!slippage || isNaN(slippageNum)) {
    return { isValid: false, error: 'Please enter a valid slippage percentage' };
  }
  
  if (slippageNum < 0.01) {
    return { isValid: false, error: 'Slippage must be at least 0.01%' };
  }
  
  if (slippageNum > 50) {
    return { isValid: false, error: 'Slippage cannot exceed 50%' };
  }
  
  return { isValid: true };
}
