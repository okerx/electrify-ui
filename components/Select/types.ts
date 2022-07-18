import { SelectHTMLAttributes } from 'react';
import { CommonColorVariants } from '@/theme/types';

export interface SelectOption {
  title: string;
  value: PrimitiveType;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[] | (string | null)[];
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  hideDetails?: boolean;
  color?: CommonColorVariants;
}
