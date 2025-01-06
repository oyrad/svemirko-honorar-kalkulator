import { create } from 'zustand';

interface SelectedYearStore {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const useSelectedYearStore = create<SelectedYearStore>()((set) => ({
  selectedYear: 2024,
  setSelectedYear: (year) => set({ selectedYear: year }),
}));
