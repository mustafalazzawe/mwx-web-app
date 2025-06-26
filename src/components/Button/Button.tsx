import { forwardRef } from "react";
import type { PropsWithChildren } from "react";

import type { IButtonProps } from "./Button.types";
import { ButtonWrapper } from "./Button.styled";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IButtonProps>>(
  (props, ref) => {
    const { children, $variant, ...rest } = props;

    return (
      <ButtonWrapper ref={ref} {...rest} $variant={$variant}>
        {children}
      </ButtonWrapper>
    );
  }
);

export default Button;
