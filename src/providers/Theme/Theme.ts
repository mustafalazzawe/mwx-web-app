import { css } from "styled-components";
import { palettes } from "./Theme.palettes";
import type {
  IThemeBreakpoints,
  IThemeCommonStyles,
  IThemeEffects,
  IThemeFonts,
  IThemeProps,
  IThemeScrollbar,
  IThemeSemanticColors,
  IThemeTypography,
} from "./Theme.types";
import { ButtonStyles } from "../../components/Button/Button.variants";
import { DropdownStyles } from "../../components/Dropdown/Dropdown.variants";
import { CardStyles } from "../../components/Card/Card.variants";
import {
  darkScrollbarStyles,
  defaultScrollbarStyles,
  hiddenScrollbarStyles,
  thinScrollbarStyles,
} from "./Theme.scrollbar";

const semanticColors: IThemeSemanticColors = {
  foreground: {
    "fg-primary": palettes.greyscale[50],
    "fg-secondary": palettes.greyscale[100],
  },
  background: {
    "bg-primary": palettes.greyscale[800],
  },
  surface: {
    "50": palettes.surface[50],
    "100": palettes.surface[100],
    "200": palettes.surface[200],
    "300": palettes.surface[300],
  },
  accent: palettes.accent[300],
  interactive: {
    "interactive-text": palettes.greyscale[50],
    "interactive-text-hover": palettes.accent[100],
    "interactive-text-active": palettes.accent[300],
    "interactive-button": palettes.accent[300],
    "interactive-button-hover": palettes.accent[400],
    "interactive-button-active": palettes.accent[200],
  },
  border: {
    primary: palettes.greyscale[700],
    secondary: palettes.surface[50],
  },
  severity: {
    bad: palettes.severity.bad,
    caution: palettes.severity.caution,
    good: palettes.severity.good,
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
    primary: {
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
    secondary: {
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
    default: css`
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
      backdrop-filter: blur(50px);
    `,
    active: css`
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
        0px 0px 8px 0px ${semanticColors.accent};
      backdrop-filter: blur(50px);
    `,
  },
  text: {
    active: css`
      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12),
        0px 0px 8px ${({ theme }) => theme.semanticColors.accent};
    `,
    severity: {
      bad: css`
        text-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
          0px 0px 8px 0px ${semanticColors.severity.bad};
      `,
      caution: css`
        text-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
          0px 0px 8px 0px ${semanticColors.severity.caution};
      `,
      good: css`
        text-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
          0px 0px 8px 0px ${semanticColors.severity.good};
      `,
    },
  },
  poi: {
    severity: {
      bad: css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
          0px 0px 16px 0px ${semanticColors.severity.bad};
        backdrop-filter: blur(50px);
      `,
      caution: css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
          0px 0px 16px 0px ${semanticColors.severity.caution};
        backdrop-filter: blur(50px);
      `,
      good: css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
          0px 0px 16px 0px ${semanticColors.severity.good};
        backdrop-filter: blur(50px);
      `,
    },
  },
};

const commonStyles: IThemeCommonStyles = {
  border: {
    main: `1px solid ${semanticColors.border.primary}`,
    nav: `1.5px solid ${semanticColors.border.secondary}`,
  },
};

const scrollbar: IThemeScrollbar = {
  default: (theme) => defaultScrollbarStyles(theme),
  thin: (theme) => thinScrollbarStyles(theme),
  dark: (theme) => darkScrollbarStyles(theme),
  hidden: hiddenScrollbarStyles,
};

export const themeVars: IThemeProps = {
  palettes,
  semanticColors,
  typography,
  breakpoints,
  effects,
  commonStyles,
  scrollbar,
  components: {
    buttons: ButtonStyles,
    cards: CardStyles,
    dropdowns: DropdownStyles,
  },
};
