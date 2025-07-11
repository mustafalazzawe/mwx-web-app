import { css } from "styled-components";
import type { ICardStyles, ICardVariantProps } from "./Card.types";

export const CardStyles: ICardStyles = {
  Default: ({ theme }: ICardVariantProps) => css`
    padding: 24px;
    background-color: ${theme.semanticColors.surface["100"]};
    border-radius: 8px;
    ${theme.effects.surface.default}
  `,

  Metric: ({ theme, $hasAlert }: ICardVariantProps) => css`
    padding: 24px;
    background-color: ${theme.semanticColors.surface["100"]};
    border-radius: 8px;
    ${theme.effects.surface.default}

    ${$hasAlert &&
    css`
      border-color: ${theme.semanticColors.severity.caution};
      ${theme.effects.text.severity.caution}
    `}
    
    .metric-label {
      ${theme.typography.body.primary.regular}
      color: ${theme.semanticColors.foreground["fg-primary"]};
      margin-bottom: 16px;
    }

    .metric-value {
      ${theme.typography.title.medium}
      color: ${$hasAlert
        ? theme.semanticColors.severity.caution
        : theme.semanticColors.accent};
      font-size: 3rem;
      line-height: 1;
      font-weight: 600;
      word-break: break-word;
      overflow-wrap: break-word;
    }
  `,

  Chart: ({ theme }: ICardVariantProps) => css`
    padding: 24px;
    background-color: ${theme.semanticColors.surface["100"]};
    border-radius: 8px;
    ${theme.effects.surface.default}
  `,

  Table: ({ theme }: ICardVariantProps) => css`
    background-color: ${theme.semanticColors.surface["100"]};
    border-radius: 8px;
    ${theme.effects.surface.default}
    padding: 24px;
    overflow: hidden;
  `,
};
