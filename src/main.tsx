import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import ThemeProvider from "./providers/Theme/ThemeProvider.tsx";
import ThreeProvider from "./providers/Three/ThreeProvider.tsx";
import { themeVars } from "./providers/Theme/Theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      palettes={themeVars.palettes}
      semanticColors={themeVars.semanticColors}
      typography={themeVars.typography}
      breakpoints={themeVars.breakpoints}
      effects={themeVars.effects}
      commonStyles={themeVars.commonStyles}
      components={themeVars.components}
    >
      <ThreeProvider>
        <App />
      </ThreeProvider>
    </ThemeProvider>
  </StrictMode>
);
