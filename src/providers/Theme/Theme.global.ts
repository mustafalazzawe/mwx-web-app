import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;

    ${({ theme }) => theme.scrollbar.default(theme)}
  }

  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    ${({ theme }) => theme.typography.body.primary.medium}

    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  }

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  .scene-container {
    position: fixed;
    top: 0;
    left: 0;
    
    width: 100vw;
    height: 100vh;
    
    z-index: 1;
  }

  .overlay {
    position: relative; 
    z-index: 10;

    /* CRITICAL: Allow Three.js interaction by default */
    pointer-events: none;
    
    /* Only overlay children with specific classes get pointer events */
    > * {
      pointer-events: auto;
    }
  }
`;

export default GlobalStyles;
