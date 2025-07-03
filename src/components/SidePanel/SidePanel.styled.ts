import styled from "styled-components";

export const SidePanelOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${({ theme }) => theme.palettes.alpha[700]};
  backdrop-filter: blur(4px);

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};

  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};

  transition: opacity 0.3s ease, visibility 0.3s ease;

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

  background-color: ${({ theme }) => theme.semanticColors.surface["300"]};
  border-left: ${({ theme }) => theme.commonStyles.border.nav};

  ${({ theme }) => theme.effects.surface.default}

  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;

  pointer-events: auto;

  z-index: 1001;
`;

export const SidePanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 24px;
  border-bottom: ${({ theme }) => theme.commonStyles.border.nav};

  h3 {
    ${({ theme }) => theme.typography.subtitle.medium}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
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
    color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};

    margin-bottom: 16px;
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
  gap: 8px;

  width: 100%;
  padding: 16px 24px;

  background-color: transparent;
  border: none;
  border-radius: 8px;

  color: ${({ theme, isActive }) =>
    isActive
      ? theme.semanticColors.interactive["interactive-text-active"]
      : theme.semanticColors.interactive["interactive-text"]};

  text-shadow: ${({ theme, isActive }) =>
    isActive
      ? `0px 2px 4px rgba(0, 0, 0, 0.25), 0px 0px 8px ${theme.semanticColors.accent}`
      : "none"};

  ${({ theme }) => theme.typography.body.secondary.medium}
  text-align: left;

  cursor: pointer;

  transition: all 0.2s ease;

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

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-label {
    flex: 1;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 8px;

  background-color: transparent;
  border: none;
  border-radius: 4px;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  
  cursor: pointer;
`;
