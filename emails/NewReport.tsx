import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Link,
  Tailwind,
  Text,
} from '@react-email/components';

interface NewReportProps {
  amount: number;
  name: string;
  url: string;
}

export default function NewReport({
  amount = 673.21,
  name = 'ISPLATA',
  url = 'http://localhost:3000',
}: NewReportProps) {
  return (
    <Html>
      <Tailwind>
        <Font fontFamily="roboto" fallbackFontFamily="sans-serif" />
        <Body className="mt-8 text-white">
          <Container className="bg-gray-800 rounded-lg px-6 pb-8 pt-0 shadow-2xl">
            <Heading className="inline-block mb-0 text-4xl uppercase">
              {name}
            </Heading>
            <Text className="text-6xl mb-6 text-emerald-500">{amount}€</Text>
            <Link
              href={url}
              className="bg-blue-600 no-underline text-white px-4 py-2 rounded-lg text-lg"
            >
              Više detalja
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
