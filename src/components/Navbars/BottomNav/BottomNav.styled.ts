import { styled } from "styled-components";

export const BottomNavWrapper = styled.div<{
  $isMobile: boolean;
  $isExpanded: boolean;
}>`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "left right";
  column-gap: 32px;

  align-items: center;

  width: 100%;
  height: 56px;
  min-height: 56px;
  max-height: 56px;

  padding: 0 32px;

  background-color: ${({ theme }) => theme.semanticColors.surface["300"]};
  border-top: ${({ theme }) => theme.commonStyles.border.nav};
  ${({ theme }) => theme.effects.surface.default}

  /* Tablet, Mobile screens */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    position: fixed;

    bottom: 0;
    left: 0;
    right: 0;

    border-radius: 16px 16px 0 0;

    /* Expandable height */
    height: ${({ $isExpanded }) => ($isExpanded ? "60vh" : "80px")};
    max-height: 80vh;

    transition: height 0.3s ease;

    overflow: hidden;

    z-index: 100;
  }
`;

export const BottomSheetHandle = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 24px;

    padding: 8px 0;

    cursor: pointer;

    &::after {
      content: "";

      width: 40px;
      height: 4px;

      background-color: ${({ theme }) =>
        theme.semanticColors.foreground["fg-primary"]};
      border-radius: 2px;

      opacity: 0.3;
    }
  }
`;

export const BottomNavContent = styled.div<{ $isExpanded: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "left right";
  column-gap: 32px;

  align-items: center;

  height: 100%;

  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
    flex-direction: column;
    gap: 16px;

    height: calc(100% - 24px);

    overflow-y: auto;
  }
`;

export const BottomNavLeft = styled.div`
  grid-area: left;

  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;

    height: auto;
  }
`;

export const BottomNavRight = styled.div`
  grid-area: right;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    justify-content: stretch;
    height: auto;
  }
`;

export const MobileSection = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .section-label {
      ${({ theme }) => theme.typography.body.secondary.medium};
      color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};
    }

    .section-content {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
`;

export const MobileModeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;

  width: 100%;

  button {
    justify-content: center;
    min-height: 44px;
  }
`;

export const CollapsedView = styled.div<{ $isExpanded: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: ${({ $isExpanded }) => ($isExpanded ? "none" : "flex")};
    justify-content: space-between;
    align-items: center;

    height: 56px;

    padding: 16px 20px 8px 20px;

    .collapsed-left {
      flex: 1;

      display: flex;
      align-items: center;
      gap: 12px;
    }

    .collapsed-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .current-mode {
      ${({ theme }) => theme.typography.body.primary.medium};
      color: ${({ theme }) =>
        theme.semanticColors.interactive["interactive-text-active"]};
    }

    .divider {
      width: 1px;
      height: 20px;
      background-color: ${({ theme }) => theme.semanticColors.border.primary};
      opacity: 0.5;
    }

    .current-floor {
      ${({ theme }) => theme.typography.body.secondary.medium}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};
    }
  }
`;
