import styled from "styled-components";
import type { IIconProps } from "./Icon.types";

const IconWrapper = styled.svg<IIconProps>`
  fill: ${({ theme }) => theme.semanticColors.foreground["fg-primary"]};

  width: ${({ fontSize }) => fontSize};
  height: ${({ fontSize }) => fontSize};
`;

export default IconWrapper;
