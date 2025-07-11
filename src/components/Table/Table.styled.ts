import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 100%;

  overflow-x: auto;
  ${({ theme }) => theme.scrollbar.default(theme)}
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ theme }) => theme.typography.body.secondary.regular}
  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.semanticColors.surface["200"]};
`;

export const TableHeaderCell = styled.th<{
  $sortable?: boolean;
  $align?: "left" | "center" | "right";
  $width?: string;
}>`
  padding: 16px 12px;
  text-align: ${({ $align = "left" }) => $align};
  ${({ theme }) => theme.typography.body.secondary.medium}
  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  border-bottom: ${({ theme }) => theme.commonStyles.border.main};
  vertical-align: middle;

  ${({ $width }) => $width && `width: ${$width};`}

  ${({ $sortable }) =>
    $sortable &&
    `
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  `}
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: ${({ theme }) => theme.commonStyles.border.main};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.semanticColors.surface["50"]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td<{
  $align?: "left" | "center" | "right";
}>`
  padding: 12px;
  text-align: ${({ $align = "left" }) => $align};
  ${({ theme }) => theme.typography.body.secondary.regular}
  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};

  word-break: break-word;
  overflow-wrap: break-word;
`;

export const SortIconWrapper = styled.span<{
  $direction: "asc" | "desc" | null;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  vertical-align: middle;

  ${({ $direction }) => {
    if ($direction === "asc") return "transform: rotate(180deg);";
    if ($direction === "desc") return "transform: rotate(0deg);";
    return "opacity: 0.5;";
  }}

  transition: transform 0.2s ease, opacity 0.2s ease;
`;

export const StatusBadge = styled.span<{ $status: "Good" | "Medium" | "Bad" }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;

  ${({ theme, $status }) => {
    switch ($status) {
      case "Good":
        return `
          background-color: ${theme.semanticColors.severity.good}20;
          color: ${theme.semanticColors.severity.good};
        `;
      case "Medium":
        return `
          background-color: ${theme.semanticColors.severity.caution}20;
          color: ${theme.semanticColors.severity.caution};
        `;
      case "Bad":
        return `
          background-color: ${theme.semanticColors.severity.bad}20;
          color: ${theme.semanticColors.severity.bad};
        `;
      default:
        return `
          background-color: ${theme.semanticColors.surface["100"]};
          color: ${theme.semanticColors.foreground["fg-secondary"]};
        `;
    }
  }}
`;
