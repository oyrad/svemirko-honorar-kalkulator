import { create } from 'zustand';
import { Debt, Expense, Split } from '@/types/types';

type RoyaltiesStore = {
  name: string;
  setName: (value: string) => void;

  grossRoyalties: string;
  setGrossRoyalties: (value: string) => void;

  isThereBookingFee: boolean;
  setIsThereBookingFee: (value: boolean) => void;

  split: Split;
  setSplit: (value: Split) => void;

  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;

  debts: Debt[];
  setDebts: (debt: Debt[]) => void;

  netBandPay: number;
  setNetBandPay: (value: number) => void;
};

export const useRoyaltiesStore = create<RoyaltiesStore>((set) => ({
  name: '',
  setName: (value) => set({ name: value }),

  grossRoyalties: '',
  setGrossRoyalties: (value: string) => set({ grossRoyalties: value }),

  isThereBookingFee: false,
  setIsThereBookingFee: (value: boolean) => set({ isThereBookingFee: value }),

  split: 'deal',
  setSplit: (value: Split) => set({ split: value }),

  expenses: [] as Expense[],
  setExpenses: (expenses: Expense[]) => set({ expenses }),

  debts: [] as Debt[],
  setDebts: (debts: Debt[]) => set({ debts }),

  netBandPay: 0,
  setNetBandPay: (value: number) => set({ netBandPay: value }),
}));
