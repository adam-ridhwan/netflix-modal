'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { delay } from '@/lib/utils';
import Overlay from '@/components/overlay';

type ModalProps = {
  option: string;
};

type Position = {
  width: string;
  height: string;
  top: number;
  left: number;
};

const Modal = ({ option }: ModalProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [position, setPosition] = useState<Position>({
    width: '',
    height: '',
    top: 0,
    left: 0,
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const node = document.getElementById(option);
    if (!node) return;

    (async () => {
      const rect = node.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      setPosition({
        width: `${(rect.width / viewportWidth) * 100}%`,
        height: `${(rect.height / viewportHeight) * 100}%`,
        top: rect.top,
        left: rect.left,
      });

      await delay(50);

      setPosition({
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      });
    })();
  }, [option]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') router.push('/home', { scroll: false });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  if (!mounted) return null;

  return createPortal(
    <>
      <Overlay />

      <div
        className='fixed z-50 grid place-items-center transition-all duration-500'
        style={position}
      >
        <div className='animate-sizeExpand relative grid size-full place-items-center rounded-lg bg-secondary'>
          <p className='text-8xl'>{option}</p>

          <button
            onClick={() => router.push('/home', { scroll: false })}
            className='absolute right-2 top-2 grid size-10 place-items-center rounded-full bg-primary/75 transition-colors hover:bg-primary/50'
          >
            <X className='stroke-secondary' />
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
