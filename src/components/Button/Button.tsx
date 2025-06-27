import { forwardRef, useState } from "react";
import type { PropsWithChildren, MouseEvent } from "react";

import { ButtonWrapper } from "./Button.styled";
import type { IButtonProps } from "./Button.types";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IButtonProps>>(
  (props, ref) => {
    const {
      children,
      $variant,
      $isTogglable = false,
      $isToggled: controlledToggled,
      $onToggle,
      onClick,
      ...rest
    } = props;

    const [internalToggled, setInternalToggled] = useState<boolean>(false);

    // Use controlled state if provided, otherwise use internal state
    const isToggled = $isTogglable 
      ? (controlledToggled !== undefined ? controlledToggled : internalToggled)
      : false;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if ($isTogglable) {
        const newToggleState = !isToggled;
        
        // Update internal state if not controlled
        if (controlledToggled === undefined) {
          setInternalToggled(newToggleState);
        }
        
        // Call onToggle callback if provided
        $onToggle?.(newToggleState);
      }
      
      // Call original onClick
      onClick?.(e);
    };

    return (
      <ButtonWrapper 
        ref={ref} 
        {...rest} 
        $variant={$variant}
        $isTogglable={$isTogglable}
        $isToggled={isToggled}
        onClick={handleClick}
      >
        {children}
      </ButtonWrapper>
    );
  }
);

Button.displayName = "Button";

export default Button;
