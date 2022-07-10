import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SpinnerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  size?: number;
}
