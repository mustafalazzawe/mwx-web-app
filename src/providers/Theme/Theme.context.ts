import { createContext, useContext } from "react";
import type { IThemeState } from "./Theme.types";

export const ThemeContext = createContext<IThemeState | undefined>(undefined);
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
