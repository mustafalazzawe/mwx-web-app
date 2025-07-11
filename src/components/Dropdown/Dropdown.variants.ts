import { css } from "styled-components";
import type { IDropdownVariantProps, IDropdownStyles } from "./Dropdown.types";

export const DropdownStyles: IDropdownStyles = {
  Label: ({ theme }: IDropdownVariantProps) => css`
    background-color: transparent;
    border: none;
    border-radius: 8px;

    &:hover {
      background-color: ${theme.semanticColors.surface[200]};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${theme.semanticColors.accent}33;
    }
  `,

  Primary: ({ theme }: IDropdownVariantProps) => css`
    background-color: ${theme.semanticColors.surface[50]};
    border: none;
    border-radius: 8px;

    color: ${theme.semanticColors.interactive["interactive-text"]};
    ${theme.typography.body.secondary.medium}

    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.semanticColors.surface[100]};
      color: ${theme.semanticColors.interactive["interactive-text-hover"]};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${theme.semanticColors.accent}33;
    }

    &:active {
      background-color: ${theme.semanticColors.surface[200]};
      color: ${theme.semanticColors.interactive["interactive-text-active"]};
    }
  `,
};
