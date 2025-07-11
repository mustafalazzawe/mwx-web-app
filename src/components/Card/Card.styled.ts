import styled from "styled-components";
import type { TCardVariants } from "./Card.types";

export const CardWrapper = styled.div<{
  $variant: TCardVariants;
  $hasAlert?: boolean;
}>`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  
  ${({ theme, $variant, $hasAlert }) => {
    const variantStyle = theme.components.cards[$variant];
    return typeof variantStyle === "function"
      ? variantStyle({ theme, $hasAlert })
      : variantStyle || "";
  }}
`;

export const CardTitle = styled.h3`
  ${({ theme }) => theme.typography.body.primary.medium}
  color: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};
  margin: 0 0 16px 0;
  text-transform: uppercase;
`;