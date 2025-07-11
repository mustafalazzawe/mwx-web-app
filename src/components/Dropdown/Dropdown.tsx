import {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
  Children,
  isValidElement,
  Fragment,
} from "react";
import type { PropsWithChildren } from "react";
import {
  DropdownWrapper,
  DropdownSelect,
  DropdownButton,
  DropdownList,
  DropdownItem,
  DropdownArrow,
} from "./Dropdown.styled";
import type { IDropdownProps, IOptionProps } from "./Dropdown.types";
import { Icon } from "../Icons/Icon";

const Dropdown = forwardRef<
  HTMLSelectElement,
  PropsWithChildren<IDropdownProps>
>((props, ref) => {
  const {
    children,
    $variant = "Label",
    $useCustomList = true,
    className,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = (): void => {
      const width = window.innerWidth;
      const isMobileView = width <= 991; // Match your tablet breakpoint
      setIsMobile(isMobileView);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldUseCustomList = $useCustomList && !isMobile;

  // Extract options from children using React.Children utilities
  const getOptionsFromChildren = useCallback(() => {
    const options: Array<{ value: string; label: string; disabled?: boolean }> =
      [];

    Children.forEach(children, (child) => {
      if (isValidElement<IOptionProps>(child) && child.type === "option") {
        const {
          value: optionValue,
          children: optionLabel,
          disabled: optionDisabled,
        } = child.props;

        if (optionValue !== undefined) {
          options.push({
            value: String(optionValue),
            label:
              typeof optionLabel === "string"
                ? optionLabel
                : String(optionValue),
            disabled: optionDisabled || false,
          });
        }
      }
    });

    return options;
  }, [children]);

  const options = getOptionsFromChildren();

  // Calculate dropdown direction
  const calculateDirection = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const isNearBottom = spaceBelow < 200;

    setDirection(isNearBottom ? "up" : "down");
  }, []);

  // Handle custom button click
  const handleCustomButtonClick = useCallback(() => {
    if (disabled) return;

    if (!isOpen) {
      calculateDirection();
      if (buttonRef.current) {
        setTriggerWidth(buttonRef.current.offsetWidth);
      }
    }
    setIsOpen(!isOpen);
  }, [isOpen, disabled, calculateDirection]);

  // Handle custom option selection
  const handleCustomOptionSelect = useCallback(
    (optionValue: string) => {
      if (disabled) return;

      // Create synthetic event to maintain consistency with native select
      const syntheticEvent = {
        target: { value: optionValue },
        currentTarget: { value: optionValue },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange?.(syntheticEvent);
      setIsOpen(false);
    },
    [onChange, disabled]
  );

  // Handle native select events
  const handleNativeFocus = (event: React.FocusEvent<HTMLSelectElement>) => {
    setIsOpen(true);
    onFocus?.(event);
  };

  const handleNativeBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    setIsOpen(false);
    onBlur?.(event);
  };

  // Click outside to close custom dropdown
  useEffect(() => {
    if (!shouldUseCustomList || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shouldUseCustomList, isOpen]);

  // Get current selection display
  const getSelectedDisplay = useCallback(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    return selectedOption?.label || "Select...";
  }, [options, value]);

  return (
    <DropdownWrapper
      ref={wrapperRef}
      $variant={$variant}
      $useCustomList={shouldUseCustomList}
      className={className}
    >
      {shouldUseCustomList ? (
        <Fragment>
          {/* Hidden native select for form integration */}
          <DropdownSelect
            ref={ref}
            {...rest}
            $variant={$variant}
            $useCustomList={true}
            $isHidden={true}
            value={value}
            onChange={onChange}
            onFocus={handleNativeFocus}
            onBlur={handleNativeBlur}
            disabled={disabled}
            tabIndex={-1} // Remove from tab order
          >
            {children}
          </DropdownSelect>

          {/* Custom button */}
          <DropdownButton
            ref={buttonRef}
            $variant={$variant}
            $isOpen={isOpen}
            onClick={handleCustomButtonClick}
            disabled={disabled}
            type="button"
          >
            <span>{getSelectedDisplay()}</span>
            <Icon iconName="Chevron" className="dropdown-icon" />
          </DropdownButton>

          {/* Custom dropdown list */}
          {isOpen && (
            <DropdownList
              $width={triggerWidth}
              $direction={direction}
              role="listbox"
            >
              {options.map((option, index) => (
                <DropdownItem
                  key={`${option.value}-${index}`}
                  $isSelected={option.value === value}
                  $isDisabled={option.disabled}
                  onClick={() =>
                    !option.disabled && handleCustomOptionSelect(option.value)
                  }
                  role="option"
                  aria-selected={option.value === value}
                >
                  <span className="item-main">{option.label}</span>
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {/* Native select for mobile */}
          <DropdownSelect
            ref={ref}
            {...rest}
            $variant={$variant}
            $useCustomList={false}
            value={value}
            onChange={onChange}
            onFocus={handleNativeFocus}
            onBlur={handleNativeBlur}
            disabled={disabled}
          >
            {children}
          </DropdownSelect>

          <DropdownArrow $isOpen={isOpen} className="dropdown-arrow">
            <Icon iconName="Chevron" />
          </DropdownArrow>
        </Fragment>
      )}
    </DropdownWrapper>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
