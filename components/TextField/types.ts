import { InputHTMLAttributes } from 'react';
import { CommonColorVariants } from '@/theme/types';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  fullWidth?: boolean;
  color?: CommonColorVariants;
}
