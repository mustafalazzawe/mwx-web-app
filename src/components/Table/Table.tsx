import React, { useState, useMemo } from "react";
import {
  TableWrapper,
  StyledTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  StatusBadge,
  SortIconWrapper,
} from "./Table.styled";
import type { ITableProps, ITableColumn, TSortDirection } from "./Table.types";
import { Icon } from "../Icons/Icon";

const Table = <T extends Record<PropertyKey, unknown>>({
  columns,
  data,
  sortable = false,
  className,
}: ITableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: TSortDirection;
  }>({ key: "", direction: null });

  const handleSort = (column: ITableColumn<T>) => {
    if (!sortable || !column.sortable) return;

    const key =
      typeof column.accessor === "string" ? column.accessor : column.key;
    let direction: TSortDirection = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.direction || !sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      // Type guard for sortable values
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }

      // Fallback for other types - convert to string for comparison
      const aStr = String(aValue);
      const bStr = String(bValue);
      return sortConfig.direction === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortConfig]);

  const getCellValue = (item: T, column: ITableColumn<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    return item[column.accessor];
  };

  const renderCellContent = (
    value: unknown,
    column: ITableColumn<T>
  ): React.ReactNode => {
    // Special handling for status badges
    if (column.key === "status" && typeof value === "string") {
      return (
        <StatusBadge $status={value as "Good" | "Medium" | "Bad"}>
          {value}
        </StatusBadge>
      );
    }

    // Handle different value types safely
    if (value === null || value === undefined) {
      return "--";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "string" || typeof value === "number") {
      return value;
    }

    // For complex objects, convert to string
    return String(value);
  };

  return (
    <TableWrapper className={className}>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.key}
                $sortable={sortable && column.sortable}
                $align={column.align}
                $width={column.width}
                onClick={() => handleSort(column)}
              >
                {column.header}
                {sortable && column.sortable && (
                  <SortIconWrapper
                    $direction={
                      sortConfig.key ===
                      (typeof column.accessor === "string"
                        ? column.accessor
                        : column.key)
                        ? sortConfig.direction
                        : null
                    }
                  >
                    <Icon
                      iconName={"Chevron"}
                      fontSize={20}
                      fill="currentColor"
                    />
                  </SortIconWrapper>
                )}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={(item.id as string) || `row-${index}`}>
              {columns.map((column) => {
                const value = getCellValue(item, column);
                return (
                  <TableCell key={column.key} $align={column.align}>
                    {renderCellContent(value, column)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
