'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { delay } from '@/lib/utils';

type ModalProps = {
  option: string;
};

type ElementPosition = {
  width: string;
  height: string;
  top: number;
  left: number;
};

const Modal = ({ option }: ModalProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [elementPosition, setElementPosition] =
    useState<ElementPosition | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const node = document.getElementById(option);
    if (!node) return;

    (async () => {
      const rect = node.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      setElementPosition({
        width: `${(rect.width / viewportWidth) * 100}%`,
        height: `${(rect.height / viewportHeight) * 100}%`,
        top: rect.top,
        left: rect.left,
      });

      await delay(50);

      setElementPosition({
        width: `100%`,
        height: `100%`,
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
    <div
      className='animate-fadeIn fixed z-50 grid place-items-center transition-all duration-700'
      style={{
        height: elementPosition?.height,
        width: elementPosition?.width,
        top: elementPosition?.top,
        left: elementPosition?.left,
      }}
    >
      <div className='grid size-full place-items-center border-2 border-white bg-black/75'>
        <p className='text-8xl'>{option}</p>
        <button
          onClick={() => router.push('/home', { scroll: false })}
          className='absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-gray-700 hover:bg-gray-600'
        >
          <X />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
