import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
`;

export default GlobalStyles;
