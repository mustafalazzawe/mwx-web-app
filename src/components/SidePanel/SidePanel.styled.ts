import { styled } from "styled-components";

export const SidePanelOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);

  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  transition: opacity 0.3s ease;

  z-index: 1000;
`;

export const SidePanelContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;

  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  width: 320px;
  max-width: 80vw;

  background-color: ${({ theme }) => theme.semanticColors.surface[300]};
  border-left: ${({ theme }) => theme.commonStyles.border.nav};
  ${({ theme }) => theme.effects.surface.default};

  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;

  z-index: 1001;
`;

export const SidePanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 24px;

  border-bottom: ${({ theme }) => theme.commonStyles.border.nav};

  h3 {
    ${({ theme }) => theme.typography.subtitle.medium};
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    margin: 0;
  }
`;

export const SidePanelContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

export const NavigationSection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    ${({ theme }) => theme.typography.body.primary.medium}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    margin-bottom: 16px;
    opacity: 0.8;
  }
`;

export const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NavigationItem = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  padding: 12px 16px;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.semanticColors.surface[200] : "transparent"};
  border: ${({ theme, isActive }) =>
    isActive
      ? `1px solid ${theme.semanticColors.accent}`
      : "1px solid transparent"};
  border-radius: 8px;

  color: ${({ theme, isActive }) =>
    isActive
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"]};

  ${({ theme }) => theme.typography.body.secondary.medium}

  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.semanticColors.surface[100]};
    color: ${({ theme }) =>
      theme.semanticColors.interactive["interactive-text-hover"]};
  }

  &:active {
    background-color: ${({ theme }) => theme.semanticColors.surface[50]};
  }

  .nav-icon {
    flex-shrink: 0;
    opacity: 0.8;
  }

  .nav-label {
    flex: 1;
  }
`;

export const CloseButton = styled.button`
  padding: 8px;
  background-color: transparent;
  border: none;
  border-radius: 4px;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.semanticColors.surface[200]};
  }
`;
