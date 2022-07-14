import { HTMLAttributes } from 'react';
import { CommonColorVariants } from '@/theme/types';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: CommonColorVariants;
  size?: BadgeSize;
}
