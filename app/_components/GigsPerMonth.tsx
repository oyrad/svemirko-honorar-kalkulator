import { Gig } from '@/types/types';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/app/_atoms/Card';

const defaultData = [
  { name: 'Jan', gigs: 0 },
  { name: 'Feb', gigs: 0 },
  { name: 'Mar', gigs: 0 },
  { name: 'Apr', gigs: 0 },
  { name: 'May', gigs: 0 },
  { name: 'Jun', gigs: 0 },
  { name: 'Jul', gigs: 0 },
  { name: 'Aug', gigs: 0 },
  { name: 'Sep', gigs: 0 },
  { name: 'Oct', gigs: 0 },
  { name: 'Nov', gigs: 0 },
  { name: 'Dec', gigs: 0 },
];

interface GigsPerMonthProps {
  gigs: Array<Gig>;
}

export function GigsPerMonth({ gigs }: GigsPerMonthProps) {
  const gigsPerMonth = gigs.reduce((acc, gig) => {
    const month = parseInt(gig.date.split('-')[1], 10) - 1;
    acc[month] = (acc[month] ?? 0) + 1;

    return acc;
  }, Array(12).fill(0));

  const chartData = defaultData.map((item, index) => ({
    ...item,
    gigs: gigsPerMonth[index],
  }));

  return (
    <Card className="dark:bg-white">
      <p className="mb-2 text-center dark:text-black">Broj svirki</p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart width={500} height={350} data={chartData} className="bg-white">
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" fontSize={13} interval={0} />
          <YAxis fontSize={13} />
          <Tooltip labelClassName="dark:text-black" />
          <Bar dataKey="gigs" fill="#349e77" name="Svirke" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
