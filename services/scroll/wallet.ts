import * as SecureStore from 'expo-secure-store';

const WALLET_KEY = 'scroll_wallet_address';
const PRIVATE_KEY = 'scroll_private_key';

export interface Wallet {
  address: string;
  publicKey: string;
}

export async function createWallet(): Promise<Wallet> {
  console.log('[WalletService] Creating new wallet');
  
  const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`;
  const mockPublicKey = `0x${Math.random().toString(16).substring(2, 130)}`;
  
  await SecureStore.setItemAsync(WALLET_KEY, mockAddress);
  await SecureStore.setItemAsync(PRIVATE_KEY, 'mock_encrypted_private_key');
  
  console.log('[WalletService] Wallet created:', mockAddress);
  
  return {
    address: mockAddress,
    publicKey: mockPublicKey,
  };
}

export async function loadWallet(): Promise<Wallet | null> {
  console.log('[WalletService] Loading existing wallet');
  
  try {
    const address = await SecureStore.getItemAsync(WALLET_KEY);
    
    if (!address) {
      console.log('[WalletService] No wallet found');
      return null;
    }
    
    console.log('[WalletService] Wallet loaded:', address);
    
    return {
      address,
      publicKey: `0x${Math.random().toString(16).substring(2, 130)}`,
    };
  } catch (error) {
    console.error('[WalletService] Error loading wallet:', error);
    return null;
  }
}

export async function deleteWallet(): Promise<void> {
  console.log('[WalletService] Deleting wallet');
  
  await SecureStore.deleteItemAsync(WALLET_KEY);
  await SecureStore.deleteItemAsync(PRIVATE_KEY);
  
  console.log('[WalletService] Wallet deleted');
}

export async function signTransaction(transaction: any): Promise<string> {
  console.log('[WalletService] Signing transaction');
  
  const mockSignature = `0x${Math.random().toString(16).substring(2, 130)}`;
  
  console.log('[WalletService] Transaction signed');
  return mockSignature;
}

export async function signMessage(message: string): Promise<string> {
  console.log('[WalletService] Signing message:', message);
  
  const mockSignature = `0x${Math.random().toString(16).substring(2, 130)}`;
  
  console.log('[WalletService] Message signed');
  return mockSignature;
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}
