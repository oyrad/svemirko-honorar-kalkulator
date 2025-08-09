import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SelectedYearStore = {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
};

export const useSelectedYearStore = create<SelectedYearStore>()(
  persist(
    (set) => ({
      selectedYear: new Date().getFullYear().toString(),
      setSelectedYear: (year) => set({ selectedYear: year }),
    }),
    {
      name: 'selected-year',
    },
  ),
);
