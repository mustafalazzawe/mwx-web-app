import { styled } from "styled-components";

export const Label = styled.div`
  padding: 0;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-secondary"]};

  ${({ theme }) => theme.typography.body.secondary.regular}
`;
