
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
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export interface UserStats {
  balance: number;
  totalWon: number;
  totalLost: number;
  revenueShare: number;
}
