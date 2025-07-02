import { styled } from "styled-components";

export const BottomNavWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "left right";
  column-gap: 32px;

  align-items: center;

  width: 100%;
  height: 48px;
  min-height: 48px;
  max-height: 48px;

  padding: 0 32px;

  background-color: ${({ theme }) => theme.semanticColors.surface["300"]};

  border-top: ${({ theme }) => theme.commonStyles.border.nav};
  ${({ theme }) => theme.effects.surface.default}
`;

export const BottomNavLeft = styled.div`
  grid-area: left;

  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 100%;
`;

export const BottomNavRight = styled.div`
  grid-area: right;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 100%;
`;
