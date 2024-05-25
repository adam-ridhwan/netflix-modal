import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const thumbnails: Record<string, string> = {
  '1': 'https://picsum.photos/id/16/1920/1080',
  '2': 'https://picsum.photos/id/29/1920/1080',
  '3': 'https://picsum.photos/id/62/1920/1080',
  '4': 'https://picsum.photos/id/66/1920/1080',
  '5': 'https://picsum.photos/id/83/1920/1080',
  '6': 'https://picsum.photos/id/110/1920/1080',
  '7': 'https://picsum.photos/id/116/1920/1080',
  '8': 'https://picsum.photos/id/125/1920/1080',
  '9': 'https://picsum.photos/id/168/1920/1080',
} as const;

export type ThumbnailId = keyof typeof thumbnails;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
