import { BaseHTMLAttributes, ElementType } from 'react';

export interface ContainerProps extends BaseHTMLAttributes<HTMLElement> {
  as?: ElementType;
}
