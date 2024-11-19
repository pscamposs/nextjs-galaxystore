interface AdminProfile {
  users: number;
  plugins: number;
  payments: number;
  totalSales: number;
  clientRanking: ClientRanking[];
}

interface ClientRanking {
  username: string;
  total: number;
  createdAt: string;
}
