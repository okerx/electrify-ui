import { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  title: string;
  value: PrimitiveType;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  hideDetails?: boolean;
}
