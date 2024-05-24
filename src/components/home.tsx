import Link from 'next/link';

import { cn, options } from '@/lib/utils';

export default function Home() {
  return (
    <main
      className={cn(
        'place-item-center grid size-full flex-col gap-8',
        'sm:grid-cols-3'
      )}
    >
      {options.map(option => (
        <Link
          id={option}
          key={option}
          href={`/${option}`}
          className='flex aspect-video min-w-full items-center justify-center rounded-lg bg-secondary'
        >
          <p className='text-8xl'>{option}</p>
        </Link>
      ))}
    </main>
  );
}
