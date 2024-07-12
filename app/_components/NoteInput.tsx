import Card from '@/app/_atoms/Card';

interface NoteInputProps {
  note: string;
  setNote: (note: string) => void;
}

export default function NoteInput({ note, setNote }: NoteInputProps) {
  return (
    <Card className="flex flex-col gap-2">
      <label htmlFor="note" className="font-semibold">
        Bilješke
      </label>
      <textarea
        name="note"
        className="h-32 text-black outline-none p-2 resize-none rounded-lg border border-gray-300 text-sm"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
    </Card>
  );
}
