import type { CSSProp } from "styled-components";
import type { TTheme } from "../../providers/Theme/Theme.types";

export type TCardVariants = "Default" | "Metric" | "Chart" | "Table";

export interface ICardVariantProps {
  theme: TTheme;
  $hasAlert?: boolean;
}

export interface ICardStyles {
  Default: ((props: ICardVariantProps) => CSSProp) | CSSProp;
  Metric: ((props: ICardVariantProps) => CSSProp) | CSSProp;
  Chart: ((props: ICardVariantProps) => CSSProp) | CSSProp;
  Table: ((props: ICardVariantProps) => CSSProp) | CSSProp;
}

export interface ICardProps {
  $variant: TCardVariants;
  title?: string;
  $hasAlert?: boolean;
}
