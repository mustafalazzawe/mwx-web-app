import styled from "styled-components";
import type { ITopNavButtons } from "./TopNav.types";

export const TopNavWrapper = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: "left center right";
  column-gap: 32px;

  align-items: center;

  width: 100%;
  height: 64px;
  min-height: 64px;
  max-height: 64px;

  padding: 0 32px;

  background-color: ${({ theme }) => theme.semanticColors.surface["300"]};

  border-bottom: ${({ theme }) => theme.commonStyles.border.nav};
  ${({ theme }) => theme.effects.surface.default}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    grid-template-columns: 1fr auto;
    grid-template-areas: "left hamburger";
    column-gap: 16px;

    padding: 0 16px;
  }
`;

export const TopNavLeft = styled.div`
  grid-area: left;

  display: flex;
  align-items: center;

  height: 100%;
`;

export const TopNavCenter = styled.div`
  grid-area: center;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: none;
  }
`;

export const TopNavRight = styled.div`
  grid-area: right;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;

  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: none;
  }
`;

export const Hamburger = styled.div`
  grid-area: hamburger;

  display: none;
  justify-content: flex-end;
  align-items: center;

  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
  }
`;

export const TopNavButtons = styled.div<ITopNavButtons>`
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
        $activeButton === "Model" ? "to left" : "to right"},
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
