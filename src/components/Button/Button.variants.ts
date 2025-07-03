import { css } from "styled-components";

import type { IButtonStyles, IButtonVariantProps } from "./Button.types";

export const ButtonStyles: IButtonStyles = {
  Label: ({ theme, $isTogglable, $isToggled }: IButtonVariantProps) => css`
    padding: 8px;
    background-color: transparent;
    border: none;

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
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25), 0px 0px 8px ${({theme}) => theme.semanticColors.accent};

        &:hover {
          color: ${theme.semanticColors.interactive["interactive-text-hover"]};
        }

        &:active {
          color: ${theme.semanticColors.interactive["interactive-text"]};
        }
      `}
    `}
  `,
  Icon: () => css`
    padding: 0;

    background-color: transparent;
    border-radius: 0;
    border: none;
  `,
  Primary: () => css``,
  Secondary: () => css``,
  Tertiary: () => css`

  `,
};
