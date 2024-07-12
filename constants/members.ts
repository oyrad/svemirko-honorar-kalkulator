interface Member {
  index: string;
  name: string;
  bgColor: string;
}

export const MEMBERS: Member[] = [
  {
    index: '1',
    name: 'Marko',
    bgColor:
      'bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-300 dark:to-blue-300',
  },
  {
    index: '2',
    name: 'Tali',
    bgColor:
      'bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-300 dark:to-fuchsia-300',
  },
  {
    index: '3',
    name: 'Dario',
    bgColor:
      'bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-300 dark:to-lime-300',
  },
];
