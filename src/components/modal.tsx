'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useModalPosition } from '@/hooks/use-modal-position';
import Overlay from '@/components/overlay';

type ModalProps = {
  option: string;
};

export default function Modal({ option }: ModalProps) {
  const { push } = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleNavigateHome = () => push('/home', { scroll: false });

  const { position } = useModalPosition(modalRef, option);

  useClickOutside(modalRef, handleNavigateHome);

  useEscapeKey(handleNavigateHome);

  return createPortal(
    <>
      <Overlay />

      <div
        ref={modalRef}
        className='fixed z-50 grid min-h-[98%] place-items-center divide-y rounded-t-lg bg-secondary'
        style={position}
      >
        <p className='text-8xl'>{option}</p>

        <button
          onClick={handleNavigateHome}
          className='absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-primary/75 transition-colors hover:bg-primary/50'
        >
          <X className='stroke-secondary' />
        </button>
      </div>
    </>,
    document.body
  );
}
