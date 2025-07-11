import type { ReactNode } from "react";

export interface ITableColumn<T extends Record<PropertyKey, unknown>> {
  key: string;
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface ITableProps<T extends Record<PropertyKey, unknown>> {
  columns: ITableColumn<T>[];
  data: T[];
  sortable?: boolean;
  className?: string;
}

export type TSortDirection = "asc" | "desc" | null;