import "styled-components";

import type { TTheme } from "./providers/Theme/Theme.types";

declare module "styled-components" {
  export interface DefaultTheme extends TTheme {}
}
