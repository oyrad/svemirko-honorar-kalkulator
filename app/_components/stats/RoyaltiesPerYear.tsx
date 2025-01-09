import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/ui/atoms/Card';
import { Report } from '@/types/types';

interface RoyaltiesPerYearProps {
  reports: Array<Report>;
}

export function RoyaltiesPerYear({ reports }: RoyaltiesPerYearProps) {
  const reports23 = reports.filter((report) => report.year === '2023');
  const reports24 = reports.filter((report) => report.year === '2024');
  const reports25 = reports.filter((report) => report.year === '2025');

  const royalties23 = reports23.reduce((acc, report) => acc + parseInt(report.netRoyalties), 0);
  const royalties24 = reports24.reduce((acc, report) => acc + parseInt(report.netRoyalties), 0);
  const royalties25 = reports25.reduce((acc, report) => acc + parseInt(report.netRoyalties), 0);

  const chartData = [
    { name: '2023', pay: royalties23 },
    { name: '2024', pay: royalties24 },
    { name: '2025', pay: royalties25 },
  ];

  return (
    <Card className="dark:bg-white">
      <p className="mb-2 text-center dark:text-black">Zarada po godinama</p>
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
          <Bar dataKey="pay" fill="#0a77aa" name="Zarada" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
