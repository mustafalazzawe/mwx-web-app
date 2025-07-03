import { styled } from "styled-components";

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
    direction === "up" ? "bottom: calc(100% + 16px);" : "top: calc(100% + 16px);"}

  left: 0;
  right: 0;

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

  z-index: 1000;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.semanticColors.surface[50]};
    border: solid 3px transparent;

    border-radius: 100px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.semanticColors.surface[100]};
    border: solid 3px transparent;

    border-radius: 100px;
  }

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

  padding: 12px 16px;
  cursor: pointer;

  color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"]};

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.semanticColors.surface[300] : "transparent"};

  ${({ theme }) => theme.typography.body.secondary.medium};

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
    margin-left: 8px;
  }
`;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  min-width: 120px;
  padding: 8px 12px;

  background-color: transparent;
  border: none;
  border-radius: 8px;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  ${({ theme }) => theme.typography.body.secondary.medium}

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.semanticColors.surface[200]};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.semanticColors.accent}33;
  }

  .dropdown-icon {
    margin-left: 8px;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease;
  }
`;
