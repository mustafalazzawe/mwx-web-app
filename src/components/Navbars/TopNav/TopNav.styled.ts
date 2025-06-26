import styled from "styled-components";

export const TopNavWrapper = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "left center right";
  column-gap: 32px;

  align-items: center;

  width: 100%;
  height: 64px;
  min-height: 64px;
  max-height: 64px;

  padding: 0px 24px;

  background-color: ${({ theme }) =>
    theme.semanticColors.background["bg-primary"]};

  border-bottom: ${({ theme }) => theme.commonStyles.border.nav};
  ${({ theme }) => theme.effects.surface.default}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "left . hamburger";
    column-gap: 16px;
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
  gap: 8px;

  width: 100%;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: none;
  }
`;

export const TopNavRight = styled.div`
  grid-area: right;

  display: flex;
  align-items: center;

  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: none;
  }
`;

export const Hamburger = styled.div`
  grid-area: hamburger;

  display: none;
  align-items: center;
  justify-content: center;

  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
  }
`;
