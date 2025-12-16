const SCROLL_MAINNET_RPC = 'https://rpc.scroll.io';
const SCROLL_TESTNET_RPC = 'https://sepolia-rpc.scroll.io';

export interface ProviderConfig {
  rpcUrl: string;
  chainId: number;
  chainName: string;
}

export const SCROLL_MAINNET: ProviderConfig = {
  rpcUrl: SCROLL_MAINNET_RPC,
  chainId: 534352,
  chainName: 'Scroll',
};

export const SCROLL_TESTNET: ProviderConfig = {
  rpcUrl: SCROLL_TESTNET_RPC,
  chainId: 534351,
  chainName: 'Scroll Sepolia',
};

export class ScrollProvider {
  private config: ProviderConfig;
  
  constructor(testnet: boolean = false) {
    this.config = testnet ? SCROLL_TESTNET : SCROLL_MAINNET;
    console.log(`[ScrollProvider] Initialized with ${this.config.chainName}`);
  }
  
  async getBalance(address: string): Promise<string> {
    console.log(`[ScrollProvider] Fetching balance for ${address}`);
    
    try {
      const response = await fetch(this.config.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 1,
        }),
      });
      
      const data = await response.json();
      const balanceWei = parseInt(data.result, 16);
      const balanceEth = (balanceWei / 1e18).toFixed(4);
      
      console.log(`[ScrollProvider] Balance: ${balanceEth} ETH`);
      return balanceEth;
    } catch (error) {
      console.error('[ScrollProvider] Error fetching balance:', error);
      return '0.0000';
    }
  }
  
  async getBlockNumber(): Promise<number> {
    try {
      const response = await fetch(this.config.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      });
      
      const data = await response.json();
      return parseInt(data.result, 16);
    } catch (error) {
      console.error('[ScrollProvider] Error fetching block number:', error);
      return 0;
    }
  }
  
  async estimateGas(transaction: any): Promise<string> {
    console.log('[ScrollProvider] Estimating gas for transaction');
    
    try {
      const response = await fetch(this.config.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_estimateGas',
          params: [transaction],
          id: 1,
        }),
      });
      
      const data = await response.json();
      const gasWei = parseInt(data.result, 16);
      const gasEth = (gasWei / 1e18).toFixed(6);
      
      console.log(`[ScrollProvider] Estimated gas: ${gasEth} ETH`);
      return gasEth;
    } catch (error) {
      console.error('[ScrollProvider] Error estimating gas:', error);
      return '0.001';
    }
  }
  
  getConfig(): ProviderConfig {
    return this.config;
  }
}

export const scrollProvider = new ScrollProvider(false);
