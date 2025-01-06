import { create } from 'zustand';

interface SelectedYearStore {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export const useSelectedYearStore = create<SelectedYearStore>()((set) => ({
  selectedYear: '2024',
  setSelectedYear: (year) => set({ selectedYear: year }),
}));
