import { Html } from '@react-email/html';
import { Button } from '@react-email/button';
import Card from '@/app/_atoms/Card';

interface NewReportProps {
  url: string;
}

export default function NewReport({ url }: NewReportProps) {
  return (
    <Html>
      <Card>
        <h1 className="text-gradient-to-r from-green-400 to-red-400">GAINS</h1>
        <Button>
          <a href={url}>Više detalja</a>
        </Button>
      </Card>
    </Html>
  );
}
