import type { ButtonHTMLAttributes } from "react";
import type { CSSProp } from "styled-components";

export type TButtonVariants = "Label";

export interface IButtonStyles {
  Label: CSSProp;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant: TButtonVariants;
}
