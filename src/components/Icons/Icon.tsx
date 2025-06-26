import { useTheme } from "styled-components";
import type { FC } from "react";

import {
  IconComponentMap,
  type IIconProps,
  type TIconEffects,
} from "./Icon.types";

export const Icon: FC<IIconProps> = (props) => {
  const { semanticColors } = useTheme();

  const {
    iconName,
    fontSize = 20,
    $secondaryFill = semanticColors.accent,
    $effects = { hasEffects: false },
    ...rest
  } = props;

  const IconComponent = IconComponentMap[iconName];

  const _props: {
    fontSize?: number | string;
    $secondaryFill?: string;
    $effects?: TIconEffects;
  } = { fontSize, $secondaryFill, $effects, ...rest };

  return <IconComponent {..._props} />;
};
