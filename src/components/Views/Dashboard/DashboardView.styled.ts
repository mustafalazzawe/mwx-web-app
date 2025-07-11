import styled from "styled-components";

export const DashboardViewWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;

  overflow: hidden;

  background-color: ${({ theme }) => theme.palettes.greyscale[800]};
`;

export const DashboardContent = styled.div`
  flex: 1 0 0;

  padding: 32px;

  overflow-y: auto;
  width: 100%;
  max-width: 100%;

  h1 {
    ${({ theme }) => theme.typography.title.medium}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    margin-bottom: 32px;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50%;
    gap: 16px;
  }

  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50%;
    gap: 16px;
    text-align: center;

    h2 {
      ${({ theme }) => theme.typography.subtitle.medium}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    }

    button {
      padding: 12px 24px;
      border: ${({ theme }) => theme.commonStyles.border.main};
      border-radius: 4px;
      background-color: ${({ theme }) =>
        theme.semanticColors.background["bg-primary"]};
      color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
      ${({ theme }) => theme.typography.body.secondary.medium}
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.semanticColors.accent};
        border-color: ${({ theme }) => theme.semanticColors.accent};
      }
    }
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid ${({ theme }) => theme.semanticColors.border.primary};
    border-top: 4px solid ${({ theme }) => theme.semanticColors.accent};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    grid-template-columns: 1fr;
  }
`;

export const TableSection = styled.div`
  width: 100%;
  max-width: 100%;
`;
