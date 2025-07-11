import { styled } from "styled-components";

export const TutorialOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palettes.alpha[700]};
  backdrop-filter: blur(4px);

  padding: 24px;

  animation: overlayFadeIn 0.3s ease-out;

  @keyframes overlayFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const TutorialCard = styled.div`
  background-color: ${({ theme }) => theme.semanticColors.surface[300]};
  border: ${({ theme }) => theme.commonStyles.border.nav};
  border-radius: 16px;

  ${({ theme }) => theme.effects.surface.default}

  padding: 32px;
  max-width: 480px;
  width: 100%;

  animation: cardSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes cardSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    /* Fill entire screen on mobile */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    max-width: none;
    width: 100%;
    height: 100%;

    padding: 24px;
    margin: 0;
    border-radius: 0;
    border: none;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
  }

  @media (min-width: ${({ theme }) =>
      theme.breakpoints.tablet.min}) and (max-width: ${({ theme }) =>
      theme.breakpoints.tablet.max}) {
    padding: 24px;
    margin: 16px;
  }
`;

export const TutorialHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    ${({ theme }) => theme.typography.title.medium}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    margin: 0 0 8px 0;
  }

  p {
    ${({ theme }) => theme.typography.body.secondary.regular}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};
    margin: 0;
  }
`;

export const TutorialContent = styled.div`
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    flex: 1;
    overflow-y: auto;
  }
`;

export const ControlsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ControlItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;

  background-color: ${({ theme }) => theme.semanticColors.surface[200]};
  border-radius: 12px;
  border: ${({ theme }) => theme.commonStyles.border.nav};

  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.semanticColors.surface[100]};
    transform: translateY(-1px);
    ${({ theme }) => theme.effects.surface.default}
  }
`;

export const ControlIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  background-color: ${({ theme }) => theme.semanticColors.surface[50]};
  border-radius: 8px;

  font-size: 24px;
  flex-shrink: 0;

  ${({ theme }) => theme.effects.surface.default}
`;

export const ControlDetails = styled.div`
  flex: 1;
  min-width: 0;

  .control-title {
    ${({ theme }) => theme.typography.body.primary.medium}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    margin: 0 0 4px 0;
  }

  .control-description {
    ${({ theme }) => theme.typography.body.secondary.regular}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};
    margin: 0;
    line-height: 1.4;
  }
`;

export const TutorialActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    flex-direction: column;
    flex-shrink: 0; /* Prevent shrinking on mobile */
    margin-top: auto; /* Push to bottom of screen */
  }
`;
