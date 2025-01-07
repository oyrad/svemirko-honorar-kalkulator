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
import { Card } from '@/app/_atoms/Card';
import { Gig, Report } from '@/types/types';

const defaultData = [
  { name: 'Jan', marko: 0, tali: 0, dario: 0 },
  { name: 'Feb', marko: 0, tali: 0, dario: 0 },
  { name: 'Mar', marko: 0, tali: 0, dario: 0 },
  { name: 'Apr', marko: 0, tali: 0, dario: 0 },
  { name: 'May', marko: 0, tali: 0, dario: 0 },
  { name: 'Jun', marko: 0, tali: 0, dario: 0 },
  { name: 'Jul', marko: 0, tali: 0, dario: 0 },
  { name: 'Aug', marko: 0, tali: 0, dario: 0 },
  { name: 'Sep', marko: 0, tali: 0, dario: 0 },
  { name: 'Oct', marko: 0, tali: 0, dario: 0 },
  { name: 'Nov', marko: 0, tali: 0, dario: 0 },
  { name: 'Dec', marko: 0, tali: 0, dario: 0 },
];

interface RoyaltiesPerPersonProps {
  reports: Array<Report>;
  gigs: Array<Gig>;
}

export function RoyaltiesPerPerson({ reports, gigs }: RoyaltiesPerPersonProps) {
  const markoRoyaltiesPerMonth = reports.reduce((acc, report) => {
    const associatedGig = gigs.find((gig) => gig._id === report.gigIds[0]);
    if (associatedGig) {
      const month = parseInt(associatedGig.date.split('-')[1], 10) - 1;
      acc[month] = (acc[month] ?? 0) + (report.netRoyaltiesPerPerson[0] ?? 0);
    }
    return acc;
  }, Array(12).fill(0));

  const taliRoyaltiesPerMonth = reports.reduce((acc, report) => {
    const associatedGig = gigs.find((gig) => gig._id === report.gigIds[0]);
    if (associatedGig) {
      const month = parseInt(associatedGig.date.split('-')[1], 10) - 1;
      acc[month] = (acc[month] ?? 0) + (report.netRoyaltiesPerPerson[1] ?? 0);
    }
    return acc;
  }, Array(12).fill(0));

  const darioRoyaltiesPerMonth = reports.reduce((acc, report) => {
    const associatedGig = gigs.find((gig) => gig._id === report.gigIds[0]);
    if (associatedGig) {
      const month = parseInt(associatedGig.date.split('-')[1], 10) - 1;
      acc[month] = (acc[month] ?? 0) + (report.netRoyaltiesPerPerson[2] ?? 0);
    }
    return acc;
  }, Array(12).fill(0));

  const chartData = defaultData.map((item, index) => ({
    ...item,
    marko: Math.round(markoRoyaltiesPerMonth[index]),
    tali: Math.round(taliRoyaltiesPerMonth[index]),
    dario: Math.round(darioRoyaltiesPerMonth[index]),
  }));

  return (
    <Card className="dark:bg-white">
      <p className="mb-2 text-center dark:text-black">Zarada po članovima</p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart width={500} height={350} data={chartData} className="bg-white ">
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip labelClassName="dark:text-black" />
          <Legend />
          <Bar dataKey="marko" fill="#3b82f6" name="Marko" />
          <Bar dataKey="tali" fill="#10b981" name="Tali" />
          <Bar dataKey="dario" fill="#ef4444" name="Dario" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
