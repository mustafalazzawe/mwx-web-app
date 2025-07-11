import { styled } from "styled-components";
import type { TDropdownVariants } from "./Dropdown.types";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownTrigger = styled.div`
  position: relative;
`;

export const DropdownList = styled.ul<{
  width: number;
  direction: "up" | "down";
  maxHeight?: number;
}>`
  position: absolute;

  /* Dynamic positioning */
  ${({ direction }) =>
    direction === "up" ? "bottom: calc(100% + 8px);" : "top: calc(100% + 8px);"}

  left: 0;
  right: 0;
  z-index: 1001;

  min-width: ${({ width }) => width}px;
  max-height: ${({ maxHeight = 200 }) => maxHeight}px;

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
      transform: ${({ direction }) =>
        direction === "up" ? "translateY(10px)" : "translateY(-10px)"};
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownItem = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  padding: 12px 16px;

  color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"]};

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.semanticColors.surface[300] : "transparent"};

  ${({ theme }) => theme.typography.body.secondary.medium};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.semanticColors.surface[100]};
    color: ${({ theme }) =>
      theme.semanticColors.interactive["interactive-text-hover"]};
  }

  &:active {
    background-color: ${({ theme }) => theme.semanticColors.surface[50]};
    color: ${({ theme }) =>
      theme.semanticColors.interactive["interactive-text-active"]};
  }

  .item-main {
    flex: 1;
  }

  .item-meta {
    ${({ theme }) => theme.typography.body.secondary.regular};
    opacity: 0.7;
  }
`;

export const DropdownButton = styled.button<{
  isOpen: boolean;
  $variant: TDropdownVariants;
}>`
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

  .dropdown-icon {
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease;
  }

  ${({ theme, $variant }) => {
    const variantStyle = theme.components.dropdowns?.[$variant];
    return typeof variantStyle === "function"
      ? variantStyle({ theme })
      : variantStyle || "";
  }}
`;
