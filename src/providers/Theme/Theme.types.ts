import type { CSSProp } from "styled-components";
import type { palettes } from "./Theme.palettes";

export type TThemePalettes = typeof palettes;
export type TThemeModes = "light" | "dark";

export interface IThemeSemanticColors {
  foreground: {
    "fg-primary": string;
  },
  background: {
    "bg-primary": string;
    "bg-secondary": string;
    "bg-tertiary": string;
    "bg-quaternary": string;
  },
  interactive: {
    "interactive-primary": string;
    "interactive-primary-hover": string;
    "interactive-primary-active": string;
  },

}

export interface IThemeFonts {
  SofiaSans: CSSProp;
}

export interface IThemeTypography {
  temp: CSSProp
}

export interface IThemeProps {
  palettes: TThemePalettes;
  semanticColors: IThemeSemanticColors;
  typography: null;
  breakpoints: null;
  components: null;
}

export interface IThemeState {
  mode: TThemeModes;
}
