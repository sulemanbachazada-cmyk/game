
export interface Game {
  id: string;
  title: string;
  category: 'Slots' | 'Table' | 'Live' | 'Instant';
  image: string;
  rating: number;
  players: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  method: string;
  status: 'settled' | 'pending' | 'authorized' | 'failed';
  date: string;
  accountLabel?: string;
}

export interface PayoutMethod {
  id: string;
  type: 'easypaisa' | 'jazzcash' | 'crypto' | 'bank';
  label: string;
  identifier: string;
  isVerified: boolean;
  priority: 'Instant' | 'Standard' | 'VIP';
}

export interface UserStats {
  balance: number;
  totalWon: number;
  totalLost: number;
  revenueShare: number;
}
