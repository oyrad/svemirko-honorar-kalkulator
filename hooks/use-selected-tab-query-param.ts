import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const TABS = {
  REPORTS: 'reports',
  GIGS: 'gigs',
  STATS: 'stats',
} as const;

export type Tab = (typeof TABS)[keyof typeof TABS];

export const tabSearchString = 'tab';

export function useSelectedTabQueryParam(): [Tab, (tab: Tab) => void] {
  const [tab, setTab] = useQueryState(tabSearchString, {
    defaultValue: TABS.REPORTS,
  });

  const isValidTab = (value: string): value is Tab => {
    return Object.values(TABS).includes(value as Tab);
  };

  useEffect(() => {
    if (!isValidTab(tab)) {
      void setTab(TABS.REPORTS);
    }
  }, [tab, setTab]);

  const currentTab = isValidTab(tab) ? tab : TABS.REPORTS;

  return [currentTab, setTab];
}
