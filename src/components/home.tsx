import Image from 'next/image';
import Link from 'next/link';

import { cn, thumbnails } from '@/lib/utils';

export default function Home() {
  return (
    <main
      className={cn(
        'place-item-center grid size-full flex-col gap-8',
        'sm:grid-cols-3'
      )}
    >
      {Object.entries(thumbnails).map(([key, value]) => (
        <Link id={key} key={key} href={`/${key}`}>
          <div className='relative flex aspect-video min-w-full items-center justify-center overflow-hidden rounded-lg bg-secondary'>
            <Image src={value} alt={key} fill className='object-cover' />
          </div>
        </Link>
      ))}
    </main>
  );
}
