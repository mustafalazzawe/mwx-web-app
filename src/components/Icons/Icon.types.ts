import type { ComponentType, SVGProps } from "react";

import * as Icons from "./src/index";
import type { CSSProp } from "styled-components";

export type TIconComponents =
  | "Chevron"
  | "Menu"
  | "Notification"
  | "NotificationNew"
  | "User";

interface IIconBaseEffectConfig {
  hasEffects?: false;
}

interface IIconEffectConfig {
  hasEffects?: true;
  effectsStyle: CSSProp;
}

export type TIconEffects = IIconBaseEffectConfig | IIconEffectConfig;

export const IconComponentMap: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = Object.entries(Icons).reduce((accumulator, [key, value]) => {
  return { ...accumulator, [key.replace("Icon", "")]: value };
}, {});

export interface IIconProps extends Omit<SVGProps<SVGSVGElement>, "onClick"> {
  iconName: TIconComponents;
  fontSize?: string | number;
  $secondaryFill?: string;
  $effects?: TIconEffects;
}
