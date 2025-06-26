import { css } from "styled-components";

import type { IButtonStyles } from "./Button.types";

export const ButtonStyles: IButtonStyles = {
  Label: css`
    padding: 8px;

    background-color: transparent;

    border: none;

    &:hover {
      color: ${({ theme }) =>
        theme.semanticColors.interactive["interactive-text-hover"]};

      transition: color 100ms ease-in;
    }

    &:active {
      color: ${({ theme }) =>
        theme.semanticColors.interactive["interactive-text-active"]};

      transition: color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
};
