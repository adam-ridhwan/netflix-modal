import { useEffect } from 'react';

import { Handler } from '@/lib/type';

export const useEscapeKey = (handler: Handler) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });
};
