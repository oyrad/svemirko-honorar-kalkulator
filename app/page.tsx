import BasicInfo from '@/app/_components/BasicInfo';
import Settings from '@/app/_components/Settings';
import ExpenseList from '@/app/_components/ExpenseList';
import Earnings from '@/app/_components/Earnings';

export default function Home() {
  return (
    <>
      <BasicInfo />
      <Settings />
      <ExpenseList />
      {/*<DebtList />*/}
      <Earnings />
    </>
  );
}
