import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CommonColorVariants } from '@/theme/types';

export interface AppBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: CommonColorVariants;
}
