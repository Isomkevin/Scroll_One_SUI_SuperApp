/**
 * Bridge Handlers
 * 
 * App-specific handlers that use the SDK's native bridge
 */

import { BridgeMethod } from '@/scrollone-sdk';
import type { HandlerContext } from '@/scrollone-sdk';
import type { 
  AccountInfo,
  BalanceInfo,
  NetworkInfo,
  TransactionRequest,
  TransactionResponse,
  SignMessageRequest,
  SignMessageResponse,
  SignTypedDataRequest,
  SignTypedDataResponse,
  GasEstimate,
} from '@/scrollone-sdk';
import { scrollProvider } from '../scroll/provider';
import { signMessage, sendTransaction } from '../scroll/wallet';
import { formatEther, parseEther } from 'ethers';
import { BridgeErrorCode, createBridgeError } from '@/scrollone-sdk';

/**
 * Get account handler
 */
export function createGetAccountHandler() {
  return async (_payload: unknown, context: HandlerContext): Promise<AccountInfo> => {
    console.log('[Handler:GET_ACCOUNT] Handler invoked with context:', {
      walletAddress: context.walletAddress,
      isWalletLocked: context.isWalletLocked,
      chainId: context.chainId,
      origin: context.origin,
    });
    const result = {
      address: context.walletAddress,
      isConnected: !!context.walletAddress,
    };
    console.log('[Handler:GET_ACCOUNT] Returning result:', result);
    return result;
  };
}

/**
 * Get balance handler
 */
export function createGetBalanceHandler() {
  return async (payload: { tokenAddress?: string } | undefined, context: HandlerContext): Promise<BalanceInfo> => {
    console.log('[Handler:GET_BALANCE] Handler invoked with payload:', payload, 'context:', {
      walletAddress: context.walletAddress,
      isWalletLocked: context.isWalletLocked,
      chainId: context.chainId,
    });
    
    if (!context.walletAddress) {
      console.error('[Handler:GET_BALANCE] Wallet not connected');
      throw createBridgeError(
        BridgeErrorCode.WALLET_NOT_CONNECTED,
        'Wallet not connected'
      );
    }

    // For now, only support ETH balance
    // TODO: Add ERC-20 token support
    if (payload?.tokenAddress) {
      console.warn('[Handler:GET_BALANCE] Token balance requested but not supported:', payload.tokenAddress);
      throw createBridgeError(
        BridgeErrorCode.UNSUPPORTED_METHOD,
        'Token balance not yet supported'
      );
    }

    try {
      console.log('[Handler:GET_BALANCE] Fetching balance for address:', context.walletAddress);
      const balance = await scrollProvider.getBalance(context.walletAddress);
      const result = {
        balance,
        formatted: formatEther(parseEther(balance)),
        symbol: 'ETH',
      };
      console.log('[Handler:GET_BALANCE] Balance fetched successfully:', result);
      return result;
    } catch (error) {
      console.error('[Handler:GET_BALANCE] Error fetching balance:', error);
      throw createBridgeError(
        BridgeErrorCode.NETWORK_ERROR,
        `Failed to fetch balance: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };
}

/**
 * Sign transaction handler
 * Note: This returns a pending response. The actual signing happens after user approval.
 */
export function createSignTransactionHandler() {
  return async (payload: TransactionRequest, context: HandlerContext): Promise<{ pending: boolean; requiresApproval: true }> => {
    console.log('[Handler:SIGN_TRANSACTION] Handler invoked with payload:', JSON.stringify(payload, null, 2));
    console.log('[Handler:SIGN_TRANSACTION] Context:', {
      walletAddress: context.walletAddress,
      isWalletLocked: context.isWalletLocked,
      chainId: context.chainId,
      origin: context.origin,
    });
    
    // Validation
    if (!payload.to) {
      console.error('[Handler:SIGN_TRANSACTION] Validation failed: missing "to" address');
      throw createBridgeError(
        BridgeErrorCode.INVALID_PAYLOAD,
        'Transaction "to" address is required'
      );
    }

    console.log('[Handler:SIGN_TRANSACTION] Transaction validated, returning pending response');
    // Return pending - actual execution happens after user approval
    return {
      pending: true,
      requiresApproval: true,
    };
  };
}

/**
 * Execute transaction (called after user approval)
 */
export async function executeTransaction(
  payload: TransactionRequest,
  context: HandlerContext
): Promise<TransactionResponse> {
  if (!context.walletAddress) {
    throw createBridgeError(
      BridgeErrorCode.WALLET_NOT_CONNECTED,
      'Wallet not connected'
    );
  }

  try {
    const provider = scrollProvider.getProvider();
    
    const txRequest = {
      to: payload.to,
      value: payload.value ? parseEther(payload.value) : undefined,
      data: payload.data,
      gasLimit: payload.gasLimit ? BigInt(payload.gasLimit) : undefined,
      gasPrice: payload.gasPrice ? BigInt(payload.gasPrice) : undefined,
    };

    const txResponse = await sendTransaction(txRequest, provider);
    
    return {
      hash: txResponse.hash,
      from: txResponse.from,
      to: txResponse.to || null,
    };
  } catch (error) {
    throw createBridgeError(
      BridgeErrorCode.TRANSACTION_FAILED,
      `Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * Sign message handler
 */
export function createSignMessageHandler() {
  return async (payload: SignMessageRequest, context: HandlerContext): Promise<SignMessageResponse> => {
    console.log('[Handler:SIGN_MESSAGE] Handler invoked with payload:', payload);
    
    if (!context.walletAddress) {
      console.error('[Handler:SIGN_MESSAGE] Wallet not connected');
      throw createBridgeError(
        BridgeErrorCode.WALLET_NOT_CONNECTED,
        'Wallet not connected'
      );
    }

    if (!payload.message) {
      console.error('[Handler:SIGN_MESSAGE] Message is required');
      throw createBridgeError(
        BridgeErrorCode.INVALID_PAYLOAD,
        'Message is required'
      );
    }

    try {
      console.log('[Handler:SIGN_MESSAGE] Signing message...');
      const signature = await signMessage(payload.message);
      console.log('[Handler:SIGN_MESSAGE] Message signed successfully');
      return { signature };
    } catch (error) {
      console.error('[Handler:SIGN_MESSAGE] Error signing message:', error);
      throw createBridgeError(
        BridgeErrorCode.SIGN_FAILED,
        `Failed to sign message: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  };
}

/**
 * Sign typed data handler
 */
export function createSignTypedDataHandler() {
  return async (payload: SignTypedDataRequest, context: HandlerContext): Promise<SignTypedDataResponse> => {
    if (!context.walletAddress) {
      throw createBridgeError(
        BridgeErrorCode.WALLET_NOT_CONNECTED,
        'Wallet not connected'
      );
    }

    // TODO: Implement EIP-712 signing
    // For now, throw unsupported
    throw createBridgeError(
      BridgeErrorCode.UNSUPPORTED_METHOD,
      'Typed data signing not yet implemented'
    );
  };
}

/**
 * Get network handler
 */
export function createGetNetworkHandler() {
  return async (_payload: unknown, context: HandlerContext): Promise<NetworkInfo> => {
    console.log('[Handler:GET_NETWORK] Handler invoked');
    const config = scrollProvider.getConfig();
    const result = {
      chainId: config.chainId,
      chainName: config.chainName,
      rpcUrl: config.rpcUrl,
      isTestnet: config.chainId === 534351,
    };
    console.log('[Handler:GET_NETWORK] Returning network info:', result);
    return result;
  };
}

/**
 * Estimate gas handler
 */
export function createEstimateGasHandler() {
  return async (payload: TransactionRequest, context: HandlerContext): Promise<GasEstimate> => {
    console.log('[Handler:ESTIMATE_GAS] Handler invoked with payload:', payload);
    
    if (!payload.to) {
      console.error('[Handler:ESTIMATE_GAS] Validation failed: missing "to" address');
      throw createBridgeError(
        BridgeErrorCode.INVALID_PAYLOAD,
        'Transaction "to" address is required'
      );
    }

    try {
      console.log('[Handler:ESTIMATE_GAS] Estimating gas...');
      const provider = scrollProvider.getProvider();
      const gasEstimate = await scrollProvider.estimateGas({
        to: payload.to,
        value: payload.value ? parseEther(payload.value) : undefined,
        data: payload.data,
      });
      
      const gasPrice = await scrollProvider.getGasPrice();
      const totalFee = gasEstimate * gasPrice;
      
      const result = {
        gasLimit: gasEstimate.toString(),
        gasPrice: gasPrice.toString(),
        estimatedFee: formatEther(totalFee.toString()),
      };
      console.log('[Handler:ESTIMATE_GAS] Gas estimation complete:', result);
      return result;
    } catch (error) {
      console.error('[Handler:ESTIMATE_GAS] Error estimating gas:', error);
      throw createBridgeError(
        BridgeErrorCode.GAS_ESTIMATION_FAILED,
        `Gas estimation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error : undefined
      );
    }
  };
}
