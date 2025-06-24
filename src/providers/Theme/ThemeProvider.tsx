import { useState } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import type { FC, PropsWithChildren } from "react";

import GlobalStyles from "./Theme.global";
import { ThemeContext } from "./Theme.context";
import type { IThemeProps, TThemeModes } from "./Theme.types";

export const ThemeProvider: FC<PropsWithChildren<IThemeProps>> = ({
  children,
  // ...props
}) => {
  // const { palettes, modes, typography, breakpoints, components } = props;

  // For now there is only a dark mode
  const [mode] = useState<TThemeModes>("dark");

  const value = { mode };

  return (
    <ThemeContext.Provider value={value}>
      <StyledComponentsThemeProvider theme={{}}>
        <GlobalStyles />

        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};
