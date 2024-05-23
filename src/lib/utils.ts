import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
export type Options = typeof options;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
