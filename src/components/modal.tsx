'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { thumbnails } from '@/lib/utils';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useModalPosition } from '@/hooks/use-modal-position';
import Overlay from '@/components/overlay';

type ModalProps = {
  id: string;
};

export default function Modal({ id }: ModalProps) {
  const { push } = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleNavigateHome = () => push('/home', { scroll: false });

  const { position } = useModalPosition(modalRef, id);

  useClickOutside(modalRef, handleNavigateHome);

  useEscapeKey(handleNavigateHome);

  return createPortal(
    <>
      <Overlay />

      <div
        ref={modalRef}
        style={position}
        className='fixed z-50 min-h-[98%] divide-y rounded-t-lg bg-secondary'
      >
        <div className='relative flex aspect-video min-w-full items-center justify-center overflow-hidden rounded-t-lg bg-secondary'>
          <Image src={thumbnails[id]} alt={id} fill className='object-cover' />
        </div>

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
