import styled from "styled-components";

export const TutorialWrapper = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);

  .controls-content {
    background-color: ${({ theme }) =>
      theme.semanticColors.surface["300"]};

    border-radius: 8px;

    ${({ theme }) => theme.effects.surface.default}

    padding: 40px;
    max-width: 500px;
    margin: 20px;

    h2 {
      ${({ theme }) => theme.typography.title.medium}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
      text-align: center;
      margin-bottom: 32px;
    }
  }

  .controls-list {
    margin-bottom: 32px;
  }

  .control-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .control-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    strong {
      ${({ theme }) => theme.typography.body.primary.medium}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
      display: block;
      margin-bottom: 4px;
    }

    p {
      ${({ theme }) => theme.typography.body.secondary.regular}
      color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
      opacity: 0.7;
      margin: 0;
    }
  }

  .controls-actions {
    text-align: center;

    button {
      padding: 12px 32px;
      min-width: 120px;
    }
  }
`;
