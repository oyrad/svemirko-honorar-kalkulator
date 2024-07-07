import { useRoyaltiesStore } from '@/stores/royaltiesStore';

export default function useClearForm() {
  const {
    setName,
    setGrossRoyalties,
    setExpenses,
    setDebts,
    setIsThereBookingFee,
    setSplit,
    setNetBandPay,
  } = useRoyaltiesStore();

  function clearForm() {
    setName('');
    setGrossRoyalties('');
    setExpenses([]);
    setDebts([]);
    setIsThereBookingFee(false);
    setSplit('deal');
    setNetBandPay(0);
  }

  return clearForm;
}
