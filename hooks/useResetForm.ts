import { useRoyaltiesStore } from '@/stores/royaltiesStore';

export default function useResetForm() {
  const {
    setName,
    setGrossRoyalties,
    setExpenses,
    setIsThereBookingFee,
    setSplit,
    setNetBandPay,
  } = useRoyaltiesStore();

  return () => {
    setName('');
    setGrossRoyalties('');
    setExpenses([]);
    setIsThereBookingFee(false);
    setSplit('deal');
    setNetBandPay(0);
  };
}
