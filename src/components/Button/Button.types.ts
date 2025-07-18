import type { ButtonHTMLAttributes } from "react";
import type { CSSProp } from "styled-components";
import type { TTheme } from "../../providers/Theme/Theme.types";

export type TButtonVariants = "Label" | "Icon" | "Primary" | "Secondary" | "Tertiary";

export interface IButtonVariantProps {
  theme: TTheme;
  $isTogglable?: boolean;
  $isToggled?: boolean;
}

export interface IButtonStyles {
  Label: ((props: IButtonVariantProps) => CSSProp) | CSSProp;
  Icon: ((props: IButtonVariantProps) => CSSProp) | CSSProp;
  Primary: ((props: IButtonVariantProps) => CSSProp) | CSSProp;
  Secondary: ((props: IButtonVariantProps) => CSSProp) | CSSProp;
  Tertiary: ((props: IButtonVariantProps) => CSSProp) | CSSProp;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant: TButtonVariants;
  $isTogglable?: boolean;
  $isToggled?: boolean;
  $onToggle?: (isToggled: boolean) => void;
}
