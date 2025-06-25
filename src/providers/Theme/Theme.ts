import { css } from "styled-components";
import { palettes } from "./Theme.palettes";
import type {
  IThemeBreakpoints,
  IThemeEffects,
  IThemeFonts,
  IThemeSemanticColors,
  IThemeTypography,
} from "./Theme.types";

const semanticColors: IThemeSemanticColors = {
  foreground: {
    "fg-primary": palettes.greyscale[50],
  },
  background: {
    "bg-primary": palettes.surface[300],
    "bg-secondary": palettes.surface[200],
    "bg-tertiary": palettes.surface[100],
    "bg-quaternary": palettes.surface[50],
  },
  interactive: {
    "interactive-text": palettes.greyscale[50],
    "interactive-text-hover": palettes.accent[100],
    "interactive-text-active": palettes.accent[300],
    "interactive-button": palettes.accent[300],
    "interactive-button-hover": palettes.accent[400],
    "interactive-button-active": palettes.accent[200],
  },
  border: {
    "01": palettes.greyscale[500],
    "02": palettes.surface[50],
  },
};

const fonts: IThemeFonts = {
  SofiaSans: css`
    font-family: "Sofia Sans", sans-serif;
  `,
};

const typography: IThemeTypography = {
  title: {
    regular: css`
      ${fonts.SofiaSans}
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.06rem;
      text-transform: uppercase;
    `,
    medium: css`
      ${fonts.SofiaSans}
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.06rem;
      text-transform: uppercase;
    `,
  },
  subtitle: {
    regular: css`
      ${fonts.SofiaSans}
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.75rem; /* 140% */
      letter-spacing: 0.0625rem;
      text-transform: uppercase;
    `,
    medium: css`
      ${fonts.SofiaSans}
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.75rem; /* 140% */
      letter-spacing: 0.0625rem;
      text-transform: uppercase;
    `,
  },
  body: {
    "01": {
      regular: css`
        ${fonts.SofiaSans}
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem; /* 150% */
        letter-spacing: 0.06rem;
        text-transform: uppercase;
      `,
      medium: css`
        ${fonts.SofiaSans}
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem; /* 150% */
        letter-spacing: 0.06rem;
        text-transform: uppercase;
      `,
    },
    "02": {
      regular: css`
        ${fonts.SofiaSans}
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3125rem; /* 150% */
        letter-spacing: 0.07rem;
        text-transform: uppercase;
      `,
      medium: css`
        ${fonts.SofiaSans}
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.3125rem; /* 150% */
        letter-spacing: 0.07rem;
        text-transform: uppercase;
      `,
    },
  },
  caption: {
    regular: css`
      ${fonts.SofiaSans}
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.125rem; /* 150% */
      letter-spacing: 0.06rem;
      text-transform: uppercase;
    `,
    medium: css`
      ${fonts.SofiaSans}
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.125rem; /* 150% */
      letter-spacing: 0.06rem;
      text-transform: uppercase;
    `,
  },
};

const breakpoints: IThemeBreakpoints = {
  mobile: {
    max: "29.938em",
  },
  tablet: {
    min: "30em",
    max: "61.938em",
  },
  desktop: {
    min: "62em",
  },
};

const effects: IThemeEffects = {
  surface: {
    default: css``,
    active: css``,
  },
};
