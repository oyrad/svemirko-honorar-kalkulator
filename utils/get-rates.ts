import { Split } from '@/types/types';

interface Rates {
  MARKO_RATE: number;
  TALI_RATE: number;
  DARIO_RATE: number;
}

export function getRates(split: Split): Rates {
  if (split === 'equal') {
    return {
      MARKO_RATE: 1 / 3,
      TALI_RATE: 1 / 3,
      DARIO_RATE: 1 / 3,
    };
  }

  return {
    MARKO_RATE: 0.45,
    TALI_RATE: 0.275,
    DARIO_RATE: 0.275,
  };
}
