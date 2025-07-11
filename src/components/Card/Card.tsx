import { forwardRef } from "react";
import type { PropsWithChildren } from "react";

import { CardWrapper, CardTitle } from "./Card.styled";
import type { ICardProps } from "./Card.types";

const Card = forwardRef<HTMLDivElement, PropsWithChildren<ICardProps>>(
  (props, ref) => {
    const { children, $variant, title, $hasAlert, ...rest } = props;

    return (
      <CardWrapper
        ref={ref}
        {...rest}
        $variant={$variant}
        $hasAlert={$hasAlert}
      >
        {title && <CardTitle>{title}</CardTitle>}
        {children}
      </CardWrapper>
    );
  }
);

Card.displayName = "Card";

export default Card;
