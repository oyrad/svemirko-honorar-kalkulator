import { Split } from '@/types/types';
import useRates from '@/hooks/useRates';

interface Member {
  index: string;
  name: string;
  rate: number;
  bgColor: string;
}

interface MembersParams {
  split: Split;
}

export default function useMembers({ split }: MembersParams): Member[] {
  const rates = useRates({ split });

  return [
    {
      index: '1',
      name: 'Marko',
      rate: rates.MARKO_RATE,
      bgColor:
        'bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-300 dark:to-blue-300',
    },
    {
      index: '2',
      name: 'Tali',
      rate: rates.TALI_RATE,
      bgColor:
        'bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-300 dark:to-fuchsia-300',
    },
    {
      index: '3',
      name: 'Dario',
      rate: rates.DARIO_RATE,
      bgColor:
        'bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-300 dark:to-lime-300',
    },
  ];
}
