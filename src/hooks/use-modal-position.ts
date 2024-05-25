import { RefObject, useEffect, useState } from 'react';

import { delay } from '@/lib/utils';

type Position = {
  opacity?: string;
  width?: number;
  top?: number;
  left?: number;
  transform?: string;
  transition?: string;
};

type UseModalPositionReturn = {
  position: Position;
};

export const useModalPosition = (
  modalRef: RefObject<HTMLDivElement>,
  id: string
): UseModalPositionReturn => {
  const [position, setPosition] = useState<Position>({
    opacity: '0',
  });

  useEffect(() => {
    const handleResize = () => {
      const initialWidth = Math.min(1400, window.innerWidth * 0.98);
      setPosition({
        ...position,
        width: initialWidth,
        left: window.innerWidth / 2 - initialWidth / 2,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  useEffect(() => {
    const node = document.getElementById(id);
    if (!node) return;

    const nodeRect = node.getBoundingClientRect();

    const modalRect = modalRef.current?.getBoundingClientRect();
    if (!modalRect) return;

    (async () => {
      const initialWidth = Math.min(1400, window.innerWidth * 0.98);

      const scale = nodeRect.width / initialWidth;
      const modalHeightHalved = modalRect.height / 2;
      const modalHeightScaledHalved = (modalRect.height * scale) / 2;

      const initialTop =
        nodeRect.top - (modalHeightHalved - modalHeightScaledHalved);
      const initialLeft = nodeRect.left - (initialWidth - nodeRect.width) / 2;

      setPosition({
        transform: `scale3d(${scale}, ${scale}, ${scale})`,
        width: initialWidth,
        top: initialTop,
        left: initialLeft,
      });

      await delay(10);

      const finalTop = window.innerHeight * 0.02;
      const finalLeft = window.innerWidth / 2 - initialWidth / 2;

      setPosition({
        transform: 'scale3d(1, 1, 1)',
        width: initialWidth,
        top: finalTop,
        left: finalLeft,
        transition: 'top 0.5s, left 0.5s, width 0.5s, transform 0.5s',
      });

      await delay(500);

      setPosition(prev => ({
        ...prev,
        transition: '',
      }));
    })();

    // eslint-disable-next-line
  }, [id]);

  return { position };
};
