import { forwardRef, memo } from "react";
import type { Ref } from "react";

import IconWrapper from "../Icon.styled";
import type { IIconProps } from "../Icon.types";

const ChevronIcon = (props: IIconProps, ref: Ref<SVGSVGElement>) => (
  <IconWrapper
    width={props.fontSize || 24}
    height={props.fontSize || 24}
    viewBox="0 0 24 24"
    fill="none"
    $secondaryFill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9998 14.975C11.8665 14.975 11.7415 14.9543 11.6248 14.913C11.5081 14.8717 11.3998 14.8007 11.2998 14.7L6.6998 10.1C6.51647 9.91665 6.4248 9.68332 6.4248 9.39999C6.4248 9.11665 6.51647 8.88332 6.6998 8.69999C6.88314 8.51665 7.11647 8.42499 7.3998 8.42499C7.68314 8.42499 7.91647 8.51665 8.0998 8.69999L11.9998 12.6L15.8998 8.69999C16.0831 8.51665 16.3165 8.42499 16.5998 8.42499C16.8831 8.42499 17.1165 8.51665 17.2998 8.69999C17.4831 8.88332 17.5748 9.11665 17.5748 9.39999C17.5748 9.68332 17.4831 9.91665 17.2998 10.1L12.6998 14.7C12.5998 14.8 12.4915 14.871 12.3748 14.913C12.2581 14.955 12.1331 14.9757 11.9998 14.975Z"
      fill={props.fill || " "}
    />
  </IconWrapper>
);

const ForwardRef = forwardRef(ChevronIcon);
const Memo = memo(ForwardRef);

export default Memo;
