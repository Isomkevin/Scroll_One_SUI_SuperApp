import { type Transaction } from '@/store/walletStore';

export async function fetchTransactions(address: string): Promise<Transaction[]> {
  console.log('[TransactionService] Fetching transactions for', address);
  
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'receive',
      amount: '1.5',
      symbol: 'ETH',
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      timestamp: Date.now() - 3600000,
      status: 'confirmed',
      hash: '0x123abc...',
      fee: '0.0021',
    },
    {
      id: '2',
      type: 'send',
      amount: '0.5',
      symbol: 'ETH',
      to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      timestamp: Date.now() - 7200000,
      status: 'confirmed',
      hash: '0x456def...',
      fee: '0.0018',
    },
    {
      id: '3',
      type: 'swap',
      amount: '100',
      symbol: 'USDC',
      timestamp: Date.now() - 10800000,
      status: 'confirmed',
      hash: '0x789ghi...',
      fee: '0.0015',
    },
  ];
  
  console.log(`[TransactionService] Found ${mockTransactions.length} transactions`);
  return mockTransactions;
}

export async function sendTransaction(
  to: string,
  amount: string,
  symbol: string
): Promise<Transaction> {
  console.log('[TransactionService] Sending transaction:', { to, amount, symbol });
  
  const transaction: Transaction = {
    id: Date.now().toString(),
    type: 'send',
    amount,
    symbol,
    to,
    timestamp: Date.now(),
    status: 'pending',
    hash: `0x${Math.random().toString(16).substring(2, 42)}`,
    fee: '0.002',
  };
  
  setTimeout(() => {
    console.log('[TransactionService] Transaction confirmed:', transaction.hash);
  }, 3000);
  
  return transaction;
}

export async function estimateTransactionFee(
  to: string,
  amount: string
): Promise<string> {
  console.log('[TransactionService] Estimating fee for:', { to, amount });
  
  const baseFee = 0.002;
  const estimatedFee = (baseFee * (1 + Math.random() * 0.2)).toFixed(4);
  
  console.log('[TransactionService] Estimated fee:', estimatedFee);
  return estimatedFee;
}

export function getTransactionExplorerUrl(hash: string, testnet: boolean = false): string {
  const baseUrl = testnet ? 'https://sepolia.scrollscan.com' : 'https://scrollscan.com';
  return `${baseUrl}/tx/${hash}`;
}

export function formatTransactionTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}
