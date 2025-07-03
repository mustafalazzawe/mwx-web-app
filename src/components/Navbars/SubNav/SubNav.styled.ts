import styled from "styled-components";
import type { ISubNavButtons } from "./SubNav.types";

export const SubNavWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: "center";
  column-gap: 32px;

  align-items: center;

  width: 100%;
  height: 48px;
  min-height: 48px;
  max-height: 48px;

  padding: 0px 32px;

  background-color: ${({ theme }) => theme.semanticColors.surface["300"]};

  border-bottom: ${({ theme }) => theme.commonStyles.border.nav};
  ${({ theme }) => theme.effects.surface.default}
`;

export const SubNavCenter = styled.div`
  grid-area: center;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const SubNavButtons = styled.div<ISubNavButtons>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  height: 100%;

  &::after {
    content: "";

    position: absolute;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 1.5px;

    background: linear-gradient(
      ${({ $activeButton }) =>
        $activeButton === "Overview" ? "to left" : "to right"},
      rgba(255, 255, 255, 0) 52%,
      rgba(255, 255, 255, 0.3) 64%,
      rgba(255, 255, 255, 1) 76%,
      rgba(255, 255, 255, 0.3) 88%,
      rgba(255, 255, 255, 0) 100%
    );

    pointer-events: none;
    z-index: 1;
  }
`;
