import { useQueryState } from 'nuqs';

export const yearSearchString = 'year';

export function useSelectedYearQueryParam(): [string, (year: string) => void] {
  return useQueryState(yearSearchString, {
    defaultValue: new Date().getFullYear().toString(),
  });
}
