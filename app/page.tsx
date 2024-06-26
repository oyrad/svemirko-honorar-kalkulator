import BasicInfo from '@/app/_components/BasicInfo';
import Settings from '@/app/_components/Settings';
import ExpenseList from '@/app/_components/ExpenseList';
import Earnings from '@/app/_components/Earnings';
import DebtList from '@/app/_components/DebtList';

export default function Home() {
  return (
    <>
      <BasicInfo />
      <Settings />
      <ExpenseList />
      <DebtList />
      <Earnings />
    </>
  );
}
