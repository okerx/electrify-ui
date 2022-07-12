import { ButtonHTMLAttributes } from 'react';
import { CommonColorVariants } from '@/theme/types';
import { ButtonSize } from '@/components/Button/types';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: CommonColorVariants;
  loading?: boolean;
}
