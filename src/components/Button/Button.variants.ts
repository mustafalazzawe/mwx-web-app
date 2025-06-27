import { css } from "styled-components";

import type { IButtonStyles, IButtonVariantProps } from "./Button.types";

export const ButtonStyles: IButtonStyles = {
  Label: ({ theme, $isTogglable, $isToggled }: IButtonVariantProps) => css`
    padding: 8px;
    background-color: transparent;
    border: none;

    /* Base styles */
    &:hover {
      color: ${theme.semanticColors.interactive["interactive-text-hover"]};
      transition: color 100ms ease-in;
    }

    &:active {
      color: ${theme.semanticColors.interactive["interactive-text-active"]};
      transition: color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    /* Togglable button styles */
    ${$isTogglable &&
    css`
      /* Default togglable state (not toggled) */

      /* If the styles were to be different based on if the variant is togglable or not */
      /* Add the styling here */

      /* Toggled state */
      ${$isToggled &&
      css`
        color: ${theme.semanticColors.interactive["interactive-text-active"]};

        &:hover {
          color: ${theme.semanticColors.interactive["interactive-text-hover"]};
        }

        &:active {
          color: ${theme.semanticColors.interactive["interactive-text"]};
        }
      `}
    `}
  `,
};
