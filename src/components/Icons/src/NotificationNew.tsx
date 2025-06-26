import { forwardRef, memo } from "react";
import type { Ref } from "react";

import IconWrapper from "../Icon.styled";
import type { IIconProps } from "../Icon.types";

const NotificationIcon = (props: IIconProps, ref: Ref<SVGSVGElement>) => {
  return (
    <IconWrapper
      width={props.fontSize || 24}
      height={props.fontSize || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      {/* Main bell shape */}
      <path
        d="M9.99968 18.3333C9.54134 18.3333 9.14912 18.1702 8.82301 17.8441C8.4969 17.518 8.33357 17.1255 8.33301 16.6666H11.6663C11.6663 17.125 11.5033 17.5175 11.1772 17.8441C10.8511 18.1708 10.4586 18.3338 9.99968 18.3333ZM4.16634 15.8333C3.93023 15.8333 3.73246 15.7533 3.57301 15.5933C3.41357 15.4333 3.33357 15.2355 3.33301 15C3.33246 14.7644 3.41246 14.5666 3.57301 14.4066C3.73357 14.2466 3.93134 14.1666 4.16634 14.1666H4.99968V8.33329C4.99968 7.18052 5.3469 6.15635 6.04134 5.26079C6.73579 4.36524 7.63857 3.77829 8.74968 3.49996V2.91663C8.74968 2.56941 8.87134 2.27441 9.11468 2.03163C9.35801 1.78885 9.65301 1.66718 9.99968 1.66663C10.3463 1.66607 10.6416 1.78774 10.8855 2.03163C11.1294 2.27552 11.2508 2.57052 11.2497 2.91663V3.18746C11.0969 3.49302 10.9858 3.80552 10.9163 4.12496C10.8469 4.44441 10.8191 4.77079 10.833 5.10413C10.6941 5.07635 10.5586 5.05191 10.4263 5.03079C10.2941 5.00968 10.1519 4.99941 9.99968 4.99996C9.08301 4.99996 8.29829 5.32635 7.64551 5.97913C6.99273 6.63191 6.66634 7.41663 6.66634 8.33329V14.1666H13.333V8.81246C13.583 8.92357 13.8505 9.01052 14.1355 9.07329C14.4205 9.13607 14.7086 9.16718 14.9997 9.16663V14.1666H15.833C16.0691 14.1666 16.2672 14.2466 16.4272 14.4066C16.5872 14.5666 16.6669 14.7644 16.6663 15C16.6658 15.2355 16.5858 15.4336 16.4263 15.5941C16.2669 15.7547 16.0691 15.8344 15.833 15.8333H4.16634Z"
        fill={props.fill || " "}
      />

      {/* Notification dot with filter */}
      <g
        filter={
          props.$effects?.hasEffects ? "url(#filter0_dd_141_4748)" : undefined
        }
      >
        <path
          d="M13.2292 6.77083C13.7153 7.25694 14.3056 7.5 15 7.5C15.6944 7.5 16.2847 7.25694 16.7708 6.77083C17.2569 6.28472 17.5 5.69444 17.5 5C17.5 4.30556 17.2569 3.71528 16.7708 3.22917C16.2847 2.74306 15.6944 2.5 15 2.5C14.3056 2.5 13.7153 2.74306 13.2292 3.22917C12.7431 3.71528 12.5 4.30556 12.5 5C12.5 5.69444 12.7431 6.28472 13.2292 6.77083Z"
          fill={props.$secondaryFill || " "}
        />
      </g>
      {/* SVG filter definition */}
      {props.$effects?.hasEffects && (
        <defs>
          <filter
            id="filter0_dd_141_4748"
            x="-87.5"
            y="-97.5"
            width="205"
            height="205"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.188235 0 0 0 0 0.823529 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_141_4748"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" // <--- Lowered from 0.12 to 0.05
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_141_4748"
              result="effect2_dropShadow_141_4748"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_141_4748"
              result="shape"
            />
          </filter>
        </defs>
      )}
    </IconWrapper>
  );
};

const ForwardRef = forwardRef(NotificationIcon);
const Memo = memo(ForwardRef);

export default Memo;
