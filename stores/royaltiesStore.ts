import { create } from 'zustand';
import { Expense, Split } from '@/types/types';

export const useRoyaltiesStore = create((set) => ({
  grossRoyalties: '',
  setGrossRoyalties: (value: string) => set({ grossRoyalties: value }),

  isThereBookingFee: true,
  setIsThereBookingFee: (value: boolean) => set({ isThereBookingFee: value }),

  split: 'deal',
  setSplit: (value: Split) => set({ split: value }),

  expenses: [] as Expense[],
  setExpenses: (expenses: Expense[]) => set({ expenses }),

  netBandPay: 0,
  setNetBandPay: (value: number) => set({ netBandPay: value }),
}));
