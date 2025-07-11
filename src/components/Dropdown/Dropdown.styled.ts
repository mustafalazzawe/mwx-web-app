import { styled } from "styled-components";
import type { TDropdownVariants } from "./Dropdown.types";

export const DropdownWrapper = styled.div<{
  $variant: TDropdownVariants;
  $useCustomList: boolean;
}>`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const DropdownSelect = styled.select<{
  $variant: TDropdownVariants;
  $useCustomList: boolean;
  $isHidden?: boolean;
}>`
  /* Base styling */
  width: 100%;
  min-width: 120px;

  border: none;
  border-radius: 8px;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  ${({ theme }) => theme.typography.body.secondary.medium}

  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  /* Always remove native arrow and add padding for custom arrow */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 40px 8px 16px; /* Space for custom arrow */

  /* Desktop with custom list - hide native select, use as data source */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop.min}) {
    ${({ $useCustomList, $isHidden }) =>
      $useCustomList &&
      $isHidden &&
      `
      position: absolute;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
    `}
  }

  /* Apply variant styles */
  ${({ theme, $variant }) => {
    const variantStyle = theme.components.dropdowns?.[$variant];
    return typeof variantStyle === "function"
      ? variantStyle({ theme })
      : variantStyle || "";
  }}

  /* Style option elements (for native rendering) */
  option {
    background-color: ${({ theme }) => theme.semanticColors.surface[300]};
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    padding: 12px 16px;
  }

  /* Focus states */
  &:focus {
    ${({ theme, $variant }) => {
      if ($variant === "Label") {
        return `box-shadow: 0 0 0 2px ${theme.semanticColors.accent}33;`;
      }
      return `box-shadow: 0 0 0 2px ${theme.semanticColors.accent}33;`;
    }}
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const DropdownButton = styled.button<{
  $variant: TDropdownVariants;
  $isOpen: boolean;
}>`
  /* Only shown when using custom list on desktop */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  width: 100%;
  min-width: 120px;
  padding: 8px 16px;

  border: none;
  border-radius: 8px;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  ${({ theme }) => theme.typography.body.secondary.medium}

  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  .dropdown-icon {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.2s ease;
  }

  /* Apply variant styles */
  ${({ theme, $variant }) => {
    const variantStyle = theme.components.dropdowns?.[$variant];
    return typeof variantStyle === "function"
      ? variantStyle({ theme })
      : variantStyle || "";
  }}

  &:focus {
    ${({ theme, $variant }) => {
      if ($variant === "Label") {
        return `box-shadow: 0 0 0 2px ${theme.semanticColors.accent}33;`;
      }
      return `box-shadow: 0 0 0 2px ${theme.semanticColors.accent}33;`;
    }}
  }
`;

export const DropdownList = styled.ul<{
  $width: number;
  $direction: "up" | "down";
  $maxHeight?: number;
}>`
  position: absolute;

  /* Dynamic positioning */
  ${({ $direction }) =>
    $direction === "up"
      ? "bottom: calc(100% + 8px);"
      : "top: calc(100% + 8px);"}

  left: 0;
  right: 0;
  z-index: 1001;

  min-width: ${({ $width }) => $width}px;
  max-height: ${({ $maxHeight = 200 }) => $maxHeight}px;

  padding: 8px 0;
  margin: 0;

  list-style: none;

  background-color: ${({ theme }) => theme.semanticColors.surface[300]};
  border-radius: 8px;
  border: ${({ theme }) => theme.commonStyles.border.nav};

  ${({ theme }) => theme.effects.surface.default}

  overflow-y: auto;
  scrollbar-gutter: auto;
  ${({ theme }) => theme.scrollbar.default(theme)}

  animation: dropdownSlide 0.15s ease-out;
  @keyframes dropdownSlide {
    from {
      opacity: 0;
      transform: ${({ $direction }) =>
        $direction === "up" ? "translateY(10px)" : "translateY(-10px)"};
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownItem = styled.li<{
  $isSelected?: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  padding: 12px 16px;

  color: ${({ theme, $isSelected, $isDisabled }) => {
    if ($isDisabled) return theme.semanticColors.foreground["fg-secondary"];
    return $isSelected
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"];
  }};

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.semanticColors.surface[200] : "transparent"};

  ${({ theme }) => theme.typography.body.secondary.medium};

  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};

  ${({ theme, $isDisabled }) =>
    !$isDisabled &&
    `
    &:hover {
      background-color: ${theme.semanticColors.surface[100]};
      color: ${theme.semanticColors.interactive["interactive-text-hover"]};
    }

    &:active {
      background-color: ${theme.semanticColors.surface[50]};
      color: ${theme.semanticColors.interactive["interactive-text-active"]};
    }
  `}

  .item-main {
    flex: 1;
  }

  .item-meta {
    ${({ theme }) => theme.typography.body.secondary.regular};
    opacity: 0.7;
  }
`;

export const DropdownArrow = styled.div<{
  $isOpen: boolean;
}>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  transition: transform 0.2s ease;

  /* Rotate when select is focused/opened */
  ${({ $isOpen }) =>
    $isOpen &&
    `
    transform: translateY(-50%) rotate(180deg);
  `}
`;
