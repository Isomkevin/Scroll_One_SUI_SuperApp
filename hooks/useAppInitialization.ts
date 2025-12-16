import { useEffect } from 'react';
import { useWalletStore } from '@/store/walletStore';
import { useUserStore } from '@/store/userStore';
import { loadWallet, createWallet } from '@/services/scroll/wallet';
import { scrollProvider } from '@/services/scroll/provider';

export function useAppInitialization() {
  const { setAddress, setBalance } = useWalletStore();
  const { setProfile, setBadges } = useUserStore();

  useEffect(() => {
    const initializeApp = async () => {
      console.log('[App] Initializing Scroll One...');

      let wallet = await loadWallet();
      if (!wallet) {
        console.log('[App] No wallet found, creating new one...');
        wallet = await createWallet();
      }

      if (wallet) {
        setAddress(wallet.address);
        console.log('[App] Wallet connected:', wallet.address);

        const balance = await scrollProvider.getBalance(wallet.address);
        setBalance(balance);
        console.log('[App] Balance loaded:', balance);

        setProfile({
          id: '1',
          username: 'scrolluser',
          displayName: 'Scroll User',
          scrollId: 'scrolluser123',
          reputation: 1250,
          level: 5,
          joinedAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
        });

        setBadges([
          { id: '1', name: 'Early Adopter', description: 'Joined in beta', icon: '🏆', earned: true, rarity: 'epic', earnedAt: Date.now() - 30 * 24 * 60 * 60 * 1000 },
          { id: '2', name: 'Power User', description: 'Made 100 transactions', icon: '⚡', earned: true, rarity: 'rare', earnedAt: Date.now() - 15 * 24 * 60 * 60 * 1000 },
          { id: '3', name: 'Accuracy Master', description: 'Complete 50 swaps', icon: '🎯', earned: false, rarity: 'epic' },
          { id: '4', name: 'Streak Champion', description: 'Active for 30 days', icon: '🔥', earned: false, rarity: 'legendary' },
        ]);

        console.log('[App] Initialization complete');
      }
    };

    initializeApp();
  }, [setAddress, setBalance, setProfile, setBadges]);
}
