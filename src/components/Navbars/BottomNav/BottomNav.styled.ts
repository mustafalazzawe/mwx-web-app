import { styled } from "styled-components";

export const BottomNavWrapper = styled.div<{
  $isMobile: boolean;
  $isExpanded: boolean;
}>`
  width: 100%;
  height: 56px;
  min-height: 56px;
  max-height: 56px;

  padding: 0 32px;

  background-color: ${({ theme }) => theme.semanticColors.surface["300"]};
  border-top: ${({ theme }) => theme.commonStyles.border.nav};
  ${({ theme }) => theme.effects.surface.default}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;

    height: ${({ $isExpanded }) => ($isExpanded ? "50vh" : "56px")};
    max-height: 80vh;
    min-height: 56px;

    padding: 24px 0;

    border-radius: 16px 16px 0 0;
    transition: height 0.3s ease;
    overflow: hidden;
  }
`;

export const BottomSheetOverlay = styled.div<{ $isVisible: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 150;

    background-color: ${({ theme }) => theme.palettes.alpha[700]};
    backdrop-filter: blur(4px);

    animation: overlayFadeIn 0.3s ease-out;

    @keyframes overlayFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

export const BottomSheetHandle = styled.div<{ $isExpanded: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: ${({ $isExpanded }) => ($isExpanded ? "calc(50vh + 8px)" : "62px")};
    z-index: 201;

    width: 100%;

    padding: 16px 0;

    cursor: pointer;

    opacity: 0.5;

    transition: all 0.3s ease;

    &:active {
      opacity: 0.9;
    }

    &:hover {
      opacity: 0.7;
    }

    .handle {
      width: 100px;
      height: 4px;

      background-color: ${({ theme }) =>
        theme.semanticColors.foreground["fg-primary"]};
      border-radius: 2px;
    }
  }
`;

export const BottomSheetHeader = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    border-bottom: ${({ theme }) => theme.commonStyles.border.nav};

    h2 {
      ${({ theme }) => theme.typography.subtitle.medium}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};

      padding-bottom: 16px;
    }
  }
`;

export const BottomNavContent = styled.div<{ $isExpanded: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "left right";
  column-gap: 32px;

  align-items: center;

  width: 100%;
  height: 100%;

  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: ${({ $isExpanded }) => ($isExpanded ? "flex" : "none")};
    flex-direction: column;
    gap: 24px;

    width: 100%;

    padding: 0 24px;
    overflow-y: hidden;
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
    grid-area: none;

    width: 100%;
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
    grid-area: none;

    width: 100%;
    height: auto;
  }
`;

export const MobileSection = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;

    .section-label {
      ${({ theme }) => theme.typography.body.primary.regular}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};
    }

    .section-content {
      display: flex;
      gap: 16px;

      width: 100%;
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
    padding: 12px 8px;
  }
`;

export const CollapsedView = styled.div<{ $isExpanded: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: ${({ $isExpanded }) => ($isExpanded ? "none" : "flex")};
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding: 16px 24px;

    .collapsed-left {
      flex: 1;

      display: flex;
      align-items: center;
      gap: 12px;

      min-width: 0;
    }

    .current-mode {
      ${({ theme }) => theme.typography.body.secondary.medium}
      color: ${({ theme }) =>
        theme.semanticColors.interactive["interactive-text-active"]};
      ${({ theme }) => theme.effects.text.active}
    }

    .divider {
      flex-shrink: 0;

      width: 1px;
      height: 20px;

      background-color: ${({ theme }) => theme.semanticColors.border.primary};
    }

    .current-floor {
      ${({ theme }) => theme.typography.body.secondary.medium}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    }
  }
`;
