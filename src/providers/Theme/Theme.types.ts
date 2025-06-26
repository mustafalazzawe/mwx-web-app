import type { CSSProp } from "styled-components";
import type { palettes } from "./Theme.palettes";
import type { themeVars } from "./Theme";
import type { ButtonStyles } from "../../components/Button/Button.variants";

export type TThemePalettes = typeof palettes;
export type TThemeModes = "light" | "dark";

export interface IThemeSemanticColors {
  foreground: {
    "fg-primary": string;
  };
  background: {
    "bg-primary": string;
    "bg-secondary": string;
    "bg-tertiary": string;
    "bg-quaternary": string;
  };
  accent: string;
  interactive: {
    "interactive-text": string;
    "interactive-text-hover": string;
    "interactive-text-active": string;
    "interactive-button": string;
    "interactive-button-hover": string;
    "interactive-button-active": string;
  };
  border: {
    primary: string;
    secondary: string;
  };
  severity: {
    bad: string;
    caution: string;
    good: string;
  };
}

export interface IThemeFonts {
  SofiaSans: CSSProp;
}

export interface IThemeTypography {
  title: {
    regular: CSSProp;
    medium: CSSProp;
  };
  subtitle: {
    regular: CSSProp;
    medium: CSSProp;
  };
  body: {
    primary: {
      regular: CSSProp;
      medium: CSSProp;
    };
    secondary: {
      regular: CSSProp;
      medium: CSSProp;
    };
  };
  caption: {
    regular: CSSProp;
    medium: CSSProp;
  };
}

export interface IThemeBreakpoints {
  mobile: {
    max: string;
  };
  tablet: {
    min: string;
    max: string;
  };
  desktop: {
    min: string;
  };
}

export interface IThemeEffects {
  surface: {
    default: CSSProp;
    active: CSSProp;
  };
  text: {
    active: CSSProp;
    severity: {
      bad: CSSProp;
      caution: CSSProp;
      good: CSSProp;
    };
  };
  poi: {
    severity: {
      bad: CSSProp;
      caution: CSSProp;
      good: CSSProp;
    };
  };
}

export interface IThemeCommonStyles {
  border: {
    main: string;
    nav: string;
  };
}

export interface IThemeComponents {
  buttons: typeof ButtonStyles;
}

export interface IThemeProps {
  palettes: TThemePalettes;
  semanticColors: IThemeSemanticColors;
  typography: IThemeTypography;
  breakpoints: IThemeBreakpoints;
  effects: IThemeEffects;
  commonStyles: IThemeCommonStyles;
  components: IThemeComponents;
}
export interface IThemeState {
  mode: TThemeModes;
}

export type TTheme = typeof themeVars;
