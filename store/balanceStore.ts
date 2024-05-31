import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './mmkv-storage';

export interface Transaction {
  id: string;
  amount: number;
  title: string;
  date: Date;
}

export interface BalanceState {
  currency: string;
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
      balance: () => get().transactions.reduce((acc, t) => acc + t.amount, 0),
      currency: '€',
      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: 'balance',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
