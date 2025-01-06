import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/app/_atoms/Card';
import { Gig, Report } from '@/types/types';

const defaultData = [
  { name: 'Jan', pay: 0 },
  { name: 'Feb', pay: 0 },
  { name: 'Mar', pay: 0 },
  { name: 'Apr', pay: 0 },
  { name: 'May', pay: 0 },
  { name: 'Jun', pay: 0 },
  { name: 'Jul', pay: 0 },
  { name: 'Aug', pay: 0 },
  { name: 'Sep', pay: 0 },
  { name: 'Oct', pay: 0 },
  { name: 'Nov', pay: 0 },
  { name: 'Dec', pay: 0 },
];

interface RoyaltiesPerMonthProps {
  reports: Array<Report>;
  gigs: Array<Gig>;
}

export function RoyaltiesPerMonth({ reports, gigs }: RoyaltiesPerMonthProps) {
  const royaltiesPerMonth = reports.reduce((acc, report) => {
    const associatedGig = gigs.find((gig) => gig._id === report.gigIds[0]);
    if (associatedGig) {
      const month = parseInt(associatedGig.date.split('-')[1], 10) - 1;
      acc[month] = (acc[month] ?? 0) + (report.netRoyalties ?? 0);
    }
    return acc;
  }, Array(12).fill(0));

  const chartData = defaultData.map((item, index) => ({
    ...item,
    pay: royaltiesPerMonth[index],
  }));

  return (
    <Card>
      <p className="mb-2 text-center">Zarada</p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart width={500} height={350} data={chartData} className="bg-white">
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pay" fill="#0a77aa" name="Zarada" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
