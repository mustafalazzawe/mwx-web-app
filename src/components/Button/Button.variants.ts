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
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25),
          0px 0px 8px ${({ theme }) => theme.semanticColors.accent};

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
  Tertiary: ({ theme, $isToggled }: IButtonVariantProps) => css`
    background-color: transparent;
    border: none;

    color: ${$isToggled
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"]};

    text-shadow: ${$isToggled
      ? `0px 2px 4px rgba(0, 0, 0, 0.25), 0px 0px 8px ${theme.semanticColors.accent}`
      : "none"};

    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.semanticColors.surface[100]};
      color: ${theme.semanticColors.interactive["interactive-text-hover"]};
    }

    &:active {
      background-color: ${theme.semanticColors.surface[50]};

      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.semanticColors.accent}33;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .nav-icon {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .nav-label {
      flex: 1;
    }

    svg,
    .icon {
      color: inherit;
      fill: currentColor;
    }
  `,
};
