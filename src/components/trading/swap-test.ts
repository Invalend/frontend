// Test file for swap functionality
// This file is for testing and debugging swap implementation

import { TOKENS, V4_POOLS } from './constants';
import { buildPoolKey, isTokenPairSupported, prepareSwapParams } from './v4-utils';

/**
 * Test function untuk memvalidasi swap implementation
 */
export function testSwapImplementation() {
  console.log('🧪 Testing Swap Implementation...');

  // Test 1: Check supported token pairs
  console.log('\n1. Testing supported token pairs:');
  const testPairs = [
    { tokenIn: TOKENS.USDC, tokenOut: TOKENS.ETH },
    { tokenIn: TOKENS.ETH, tokenOut: TOKENS.USDC },
    { tokenIn: TOKENS.USDC, tokenOut: TOKENS.BTC },
    { tokenIn: TOKENS.BTC, tokenOut: TOKENS.USDC },
    { tokenIn: TOKENS.ETH, tokenOut: TOKENS.BTC },
    { tokenIn: TOKENS.BTC, tokenOut: TOKENS.ETH },
  ];

  testPairs.forEach(({ tokenIn, tokenOut }) => {
    const isSupported = isTokenPairSupported(tokenIn, tokenOut);
    console.log(`  ${tokenIn.symbol} → ${tokenOut.symbol}: ${isSupported ? '✅' : '❌'}`);
  });

  // Test 2: Test pool key building
  console.log('\n2. Testing pool key building:');
  testPairs.forEach(({ tokenIn, tokenOut }) => {
    const poolKey = buildPoolKey(tokenIn, tokenOut);
    if (poolKey) {
      console.log(`  ${tokenIn.symbol} → ${tokenOut.symbol}:`);
      console.log(`    Currency0: ${poolKey.currency0}`);
      console.log(`    Currency1: ${poolKey.currency1}`);
      console.log(`    Fee: ${poolKey.fee}`);
      console.log(`    Tick Spacing: ${poolKey.tickSpacing}`);
    } else {
      console.log(`  ${tokenIn.symbol} → ${tokenOut.symbol}: ❌ No pool found`);
    }
  });

  // Test 3: Test swap parameters preparation
  console.log('\n3. Testing swap parameters preparation:');
  const testAmount = '100';
  const testSlippage = 0.5;

  testPairs.forEach(({ tokenIn, tokenOut }) => {
    try {
      const swapParams = prepareSwapParams(tokenIn, tokenOut, testAmount, testSlippage);
      if (swapParams) {
        console.log(`  ${tokenIn.symbol} → ${tokenOut.symbol}:`);
        console.log(`    Amount In: ${swapParams.amountIn.toString()}`);
        console.log(`    Amount Out Min: ${swapParams.amountOutMinimum.toString()}`);
        console.log(`    Deadline: ${swapParams.deadline.toString()}`);
      }
    } catch (error) {
      console.log(`  ${tokenIn.symbol} → ${tokenOut.symbol}: ❌ ${error}`);
    }
  });

  console.log('\n✅ Swap implementation test completed!');
}

/**
 * Test function untuk memvalidasi token addresses
 */
export function testTokenAddresses() {
  console.log('🔍 Testing Token Addresses...');

  Object.entries(TOKENS).forEach(([symbol, token]) => {
    console.log(`${symbol}:`);
    console.log(`  Address: ${token.address}`);
    console.log(`  Decimals: ${token.decimals}`);
    console.log(`  Price: ${token.price}`);
    console.log(`  Is Native: ${token.isNative || false}`);
    console.log('');
  });
}

/**
 * Test function untuk memvalidasi pool configurations
 */
export function testPoolConfigurations() {
  console.log('🏊‍♂️ Testing Pool Configurations...');
  
  Object.entries(V4_POOLS).forEach(([poolName, pool]) => {
    console.log(`${poolName}:`);
    console.log(`  Pool ID: ${pool.poolId}`);
    console.log(`  Currency0: ${pool.currency0}`);
    console.log(`  Currency1: ${pool.currency1}`);
    console.log(`  Fee: ${pool.fee}`);
    console.log(`  Tick Spacing: ${pool.tickSpacing}`);
    console.log('');
  });
}

// Export test functions for use in console
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).testSwap = {
    testSwapImplementation,
    testTokenAddresses,
    testPoolConfigurations
  };
}
