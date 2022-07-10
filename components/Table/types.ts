import React, { TableHTMLAttributes } from 'react';

export interface MinTableItem {
  id: PrimitiveType;
}

export type TableHeaders<T extends MinTableItem = any> = Record<
  keyof T,
  { title: string; sortable?: boolean }
>;

export type CustomRenderers<T extends MinTableItem = any> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

export type TableSort<T extends MinTableItem = any> = {
  by: keyof T;
  type: 'asc' | 'desc';
};

export type TablePagination = {
  page: number;
  perPage: number;
  total: number;
};

export interface TableProps<T extends MinTableItem>
  extends TableHTMLAttributes<HTMLTableElement> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
  sort?: TableSort<T>;
  pagination?: TablePagination;
  loading?: boolean;
  onSort?: (s: TableSort) => void;
  onPagination?: (p: TablePagination) => void;
  onRowClick?: (it: T) => void;
}
