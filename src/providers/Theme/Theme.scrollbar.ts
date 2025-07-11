import { css } from "styled-components";
import type { TTheme } from "./Theme.types";

export interface IScrollbarOptions {
  width?: number;
  thumbColor?: string;
  trackColor?: string;
  borderRadius?: number;
  border?: number;
}

export const createScrollbarStyles = (
  theme: TTheme,
  options: IScrollbarOptions = {}
) => {
  const {
    width = 12,
    thumbColor = theme.semanticColors.surface[50],
    trackColor = theme.semanticColors.surface[100],
    borderRadius = 100,
    border = 3,
  } = options;

  return css`
    /* Firefox scrollbar */
    scrollbar-width: thin;
    scrollbar-color: ${thumbColor} ${trackColor};

    /* Webkit scrollbar (Chrome, Safari, Edge) */
    &::-webkit-scrollbar {
      width: ${width}px;
      height: ${width}px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 16px 16px ${thumbColor};
      border: solid ${border}px transparent;
      border-radius: ${borderRadius}px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 16px 16px ${trackColor};
      border: solid ${border}px transparent;
      border-radius: ${borderRadius}px;
    }

    /* Optional: Add hover states for better UX */
    &::-webkit-scrollbar-thumb:hover {
      box-shadow: inset 0 0 16px 16px ${theme.semanticColors.surface[200]};
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  `;
};

/**
 * Default application scrollbar styles
 * Use this for most containers
 */
export const defaultScrollbarStyles = (theme: TTheme) =>
  createScrollbarStyles(theme);

/**
 * Thin scrollbar variant for smaller containers
 */
export const thinScrollbarStyles = (theme: TTheme) =>
  createScrollbarStyles(theme, { width: 8, border: 2 });

/**
 * Dark scrollbar variant
 */
export const darkScrollbarStyles = (theme: TTheme) =>
  createScrollbarStyles(theme, {
    thumbColor: theme.semanticColors.surface[200],
    trackColor: theme.semanticColors.surface[300],
  });

/**
 * Invisible scrollbar (scrollable but hidden)
 * Useful for custom scroll implementations
 */
export const hiddenScrollbarStyles = css`
  /* Firefox */
  scrollbar-width: none;

  /* Webkit */
  &::-webkit-scrollbar {
    display: none;
  }

  /* IE and Edge */
  -ms-overflow-style: none;
`;
