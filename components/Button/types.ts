import { ButtonHTMLAttributes } from 'react';
import { CommonColorVariants } from '@/theme/types';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: CommonColorVariants;
  loading?: boolean;
}
