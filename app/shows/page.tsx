import Card from '@/app/_atoms/Card';

export default function Shows() {
  return (
    <div>
      <Card>
        <div>
          <h2 className="font-semibold text-lg">
            Nigdjezemska
            <span className="text-gray-500 font-light">ZADAR</span>
          </h2>
          <p>{new Date().toLocaleDateString('hr-HR')}</p>
        </div>
      </Card>
    </div>
  );
}
