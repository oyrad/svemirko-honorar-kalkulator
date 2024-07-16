import Card from '@/app/_atoms/Card';
import { ChangeEvent } from 'react';

interface NoteInputProps {
  note: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

export default function NoteInput({ note, handleChange }: NoteInputProps) {
  return (
    <Card className="flex flex-col gap-2">
      <label htmlFor="note" className="font-semibold">
        Bilješke
      </label>
      <textarea
        name="note"
        className="h-28 text-black outline-none p-2 resize-none rounded-lg border border-gray-300 text-sm"
        value={note}
        onChange={handleChange}
      ></textarea>
    </Card>
  );
}
