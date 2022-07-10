import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  open: boolean;
  setOpen: (o: boolean) => void;
  title: string;
  children: ReactNode;
  maxWidth?: number;
}
