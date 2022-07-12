import React, { TableHTMLAttributes } from 'react';

export interface MinTableItem {
  id: PrimitiveType;
}

export type TableHeaders<T extends MinTableItem = any> = Record<
  keyof T | string,
  { title: string; sortable?: boolean }
>;

export type CustomRenderers<T extends MinTableItem = any> = Partial<
  Record<keyof T | string, (it: T) => React.ReactNode>
>;

export type TableSort = {
  by: string;
  type: 'asc' | 'desc';
};

export type TablePagination = {
  page: string;
  perPage: string;
  total?: string;
};

export interface TableProps<T extends MinTableItem>
  extends TableHTMLAttributes<HTMLTableElement> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
  sort?: TableSort;
  pagination?: TablePagination;
  loading?: boolean;
  onSort?: (s: TableSort) => void;
  onPagination?: (p: { page: string; perPage: string }) => void;
  onRowClick?: (it: T) => void;
}
