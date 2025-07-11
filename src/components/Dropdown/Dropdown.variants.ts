import { css } from "styled-components";
import type { IDropdownVariantProps, IDropdownStyles } from "./Dropdown.types";

export const DropdownStyles: IDropdownStyles = {
  Label: ({ theme }: IDropdownVariantProps) => css`
    background-color: transparent;

    &:hover {
      background-color: ${theme.semanticColors.surface[200]};
    }

    &:focus {
      background-color: ${theme.semanticColors.surface[100]};
    }
  `,

  Primary: ({ theme }: IDropdownVariantProps) => css`
    background-color: ${theme.semanticColors.surface[50]};

    &:hover {
      background-color: ${theme.semanticColors.surface[100]};
      color: ${theme.semanticColors.interactive["interactive-text-hover"]};
    }

    &:focus {
      background-color: ${theme.semanticColors.surface[100]};
    }

    &:active {
      background-color: ${theme.semanticColors.surface[200]};
      color: ${theme.semanticColors.interactive["interactive-text-active"]};
    }
  `,
};