import styled from 'styled-components';

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
      background-color: ${({ theme }) => theme.semanticColors.background["bg-primary"]};
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
`;

export const MetricCard = styled.div<{ $hasAlert?: boolean }>`
  padding: 24px;
  
  background-color: ${({ theme }) => theme.semanticColors.surface["100"]};
  border-radius: 8px;
  ${({ theme }) => theme.effects.surface.default}
  
  ${({ $hasAlert, theme }) => $hasAlert && `
    border-color: ${theme.semanticColors.severity.caution};
    ${theme.effects.text.severity.caution}
  `}
  
  .metric-label {
    ${({ theme }) => theme.typography.body.primary.regular}
    color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
    margin-bottom: 16px;
  }
  
  .metric-value {
    ${({ theme }) => theme.typography.title.medium}
    color: ${({ theme, $hasAlert }) => 
      $hasAlert ? theme.semanticColors.severity.caution : theme.semanticColors.accent
    };
    font-size: 3rem;
    line-height: 1;
    font-weight: 600;
  }
`;