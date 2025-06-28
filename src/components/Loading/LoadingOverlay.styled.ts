import styled from "styled-components";

export const LoadingOverlayWrapper = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 24px;

  background-color: ${({ theme }) => theme.semanticColors.surface[300]};
  border-radius: 8px;

  z-index: 5;

  text-align: center;

  h2 {
    margin: 16px 0 8px 0;

    ${({ theme }) => theme.typography.subtitle.medium}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  }

  p {
    ${({ theme }) => theme.typography.body.primary.regular}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
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
