import type { ReactNode, SelectHTMLAttributes } from "react";
import type { CSSProp } from "styled-components";
import type { TTheme } from "../../providers/Theme/Theme.types";

export type TDropdownVariants = "Label" | "Primary";

export interface IDropdownVariantProps {
  theme: TTheme;
  $isOpen?: boolean;
}

export interface IDropdownStyles {
  Label: ((props: IDropdownVariantProps) => CSSProp) | CSSProp;
  Primary: ((props: IDropdownVariantProps) => CSSProp) | CSSProp;
}

export interface IDropdownProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  $variant?: TDropdownVariants;
  $useCustomList?: boolean;
}

export interface IOptionProps {
  value: string | number;
  children: ReactNode;
  disabled?: boolean;
}
