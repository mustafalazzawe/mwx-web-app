import { styled } from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownList = styled.ul<{ width: number }>`
  position: absolute;

  bottom: 100%;

  width: ${({ width }) => width}px;
  height: fit-content;
  max-height: 200px;

  padding: 0;
  margin: 0;
  inset: auto;

  margin-bottom: 8px;

  list-style: none;

  background-color: ${({ theme }) => theme.semanticColors.surface[300]};
`;
