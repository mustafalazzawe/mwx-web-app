import type { CSSProp } from "styled-components";
import type { palettes } from "./Theme.palettes";

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
  interactive: {
    "interactive-text": string;
    "interactive-text-hover": string;
    "interactive-text-active": string;
    "interactive-button": string;
    "interactive-button-hover": string;
    "interactive-button-active": string;
  };
  border: {
    "01": string;
    "02": string;
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
    "01": {
      regular: CSSProp;
      medium: CSSProp;
    };
    "02": {
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
    main: CSSProp;
    nav: CSSProp;
  };
}

export interface IThemeComponents {
  buttons: "";
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
