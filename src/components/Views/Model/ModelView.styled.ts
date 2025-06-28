import styled from "styled-components";

export const ModelViewWrapper = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  /* CRITICAL: Allow Three.js interaction by default */
  pointer-events: none;

  /* Only direct children that need interaction get pointer events */
  > * {
    pointer-events: auto;
  }

  /* Override the global .overlay to allow Three.js interaction */
  .overlay & {
    pointer-events: none;
  }
`;
