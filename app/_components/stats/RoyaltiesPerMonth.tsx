import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '@/ui/atoms/Card';
import { Gig, Report } from '@/types/types';

const defaultData = [
  { name: 'Jan', gross: 0, net: 0 },
  { name: 'Feb', gross: 0, net: 0 },
  { name: 'Mar', gross: 0, net: 0 },
  { name: 'Apr', gross: 0, net: 0 },
  { name: 'May', gross: 0, net: 0 },
  { name: 'Jun', gross: 0, net: 0 },
  { name: 'Jul', gross: 0, net: 0 },
  { name: 'Aug', gross: 0, net: 0 },
  { name: 'Sep', gross: 0, net: 0 },
  { name: 'Oct', gross: 0, net: 0 },
  { name: 'Nov', gross: 0, net: 0 },
  { name: 'Dec', gross: 0, net: 0 },
];

interface RoyaltiesPerMonthProps {
  reports: Array<Report>;
  gigs: Array<Gig>;
}

export function RoyaltiesPerMonth({ reports, gigs }: RoyaltiesPerMonthProps) {
  const netRoyaltiesPerMonth = reports.reduce((acc, report) => {
    const associatedGig = gigs.find((gig) => gig._id === report.gigIds[0]);
    if (associatedGig) {
      const month = parseInt(associatedGig.date.split('-')[1], 10) - 1;
      acc[month] = (acc[month] ?? 0) + report.netRoyalties;
    }
    return acc;
  }, Array(12).fill(0));

  console.log({ reports });

  const grossRoyaltiesPerMonth = reports.reduce((acc, report) => {
    const associatedGig = gigs.find((gig) => gig._id === report.gigIds[0]);
    console.log(associatedGig);
    if (associatedGig) {
      const month = parseInt(associatedGig.date.split('-')[1], 10) - 1;
      acc[month] =
        (acc[month] ?? 0) +
        (report.isThereBookingFee
          ? parseFloat(report.grossRoyalties) * 0.9
          : parseFloat(report.grossRoyalties));
    }
    return acc;
  }, Array(12).fill(0));

  const chartData = defaultData.map((item, index) => ({
    ...item,
    gross: Math.round(grossRoyaltiesPerMonth[index]),
    net: Math.round(netRoyaltiesPerMonth[index]),
  }));

  return (
    <Card className="dark:bg-white">
      <p className="mb-2 text-center dark:text-black">Zarada</p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          width={500}
          height={350}
          data={chartData}
          className="bg-white"
          margin={{
            left: -14,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" fontSize={12} interval={0} />
          <YAxis fontSize={12} />
          <Tooltip labelClassName="dark:text-black" />
          <Bar dataKey="gross" fill="#f97316" name="Nakon provizije" />
          <Bar dataKey="net" fill="#0a77aa" name="Nakon troškova" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
