import Link from 'next/link';

import { options } from '@/lib/utils';

const Home = () => {
  return (
    <main className='place-item-center grid size-full flex-col gap-8 sm:grid-cols-3'>
      {options.map(option => (
        <Link
          id={option}
          key={option}
          href={`/${option}`}
          className='flex aspect-video min-w-full items-center justify-center rounded-lg border-2 border-white'
        >
          <p className='text-8xl'>{option}</p>
        </Link>
      ))}
    </main>
  );
};

export default Home;
