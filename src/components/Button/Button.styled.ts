import { styled } from "styled-components";
import type { IButtonProps } from "./Button.types";

export const ButtonWrapper = styled.button<IButtonProps>`
  display: flex;

  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 8px 12px;
  border-radius: 4px;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};

  ${({ theme }) => theme.typography.body.secondary.medium}

  cursor: pointer;

  ${({ theme, $variant }) => theme.components.buttons[$variant]}
`;
