import { css } from "styled-components";

import type {
  IButtonStyles,
  IButtonVariantProps,
} from "./Button.types";

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
        ${({ theme }) => theme.effects.text.active};

        &:hover {
          color: ${theme.semanticColors.interactive["interactive-text-hover"]};
        }

        &:active {
          color: ${theme.semanticColors.interactive["interactive-text"]};
        }
      `}
    `}
  `,

  Icon: ({ theme }: IButtonVariantProps) => css`
    padding: 4px;

    background-color: transparent;
    border: none;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${theme.semanticColors.accent}33;
    }
  `,

  Primary: ({ theme, $isToggled }: IButtonVariantProps) => css`
    background-color: ${({ theme }) => theme.semanticColors.surface[50]};
    border: none;

    color: ${$isToggled
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"]};

    ${$isToggled ? theme.effects.text.active : "text-shadow: none"};

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

  Secondary: () => css``,

  Tertiary: ({ theme, $isToggled }: IButtonVariantProps) => css`
    background-color: transparent;
    border: none;

    color: ${$isToggled
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"]};

    ${$isToggled ? theme.effects.text.active : "text-shadow: none"};

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
