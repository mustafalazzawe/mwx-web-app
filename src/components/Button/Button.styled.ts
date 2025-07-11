import { styled } from "styled-components";
import type { TButtonVariants } from "./Button.types";

export const ButtonWrapper = styled.button<{
  $variant: TButtonVariants;
  $isTogglable?: boolean;
  $isToggled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  padding: 8px 16px;
  border-radius: 8px;

  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  ${({ theme }) => theme.typography.body.secondary.medium}

  cursor: pointer;

  ${({ theme, $variant, $isTogglable, $isToggled }) => {
    const variantStyle = theme.components.buttons[$variant];
    return typeof variantStyle === "function"
      ? variantStyle({ theme, $isTogglable, $isToggled })
      : variantStyle || "";
  }}
`;
