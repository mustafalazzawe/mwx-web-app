import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { isFloorOption, type IDropdownProps, type IFloorOption } from "./Dropdown.types";
import {
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownList,
  DropdownTrigger,
} from "./Dropdown.styled";
import { Icon } from "../Icons/Icon";

const Dropdown: FC<IDropdownProps> = (props) => {
  const {
    options,
    selectedValue,
    onChange,
    placeholder = "Select...",
    direction = "auto",
    showSensorCount = false,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">(
    "down"
  );
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  // Get display value for selected option
  const getSelectedDisplay = useCallback((): string => {
    if (!selectedValue) return placeholder;
    
    const selectedOption = options.find(option => 
      isFloorOption(option) ? option.id === selectedValue : option === selectedValue
    );
    
    if (!selectedOption) return placeholder;
    
    if (isFloorOption(selectedOption)) {
      return showSensorCount && selectedOption.sensorCount !== undefined
        ? `${selectedOption.label} (${selectedOption.sensorCount})`
        : selectedOption.label;
    }
    
    return selectedOption.toString();
  }, [selectedValue, options, placeholder, showSensorCount]);

 // Calculate dropdown direction
  const calculateDirection = useCallback(() => {
    if (direction !== 'auto') {
      setDropdownDirection(direction);
      return;
    }

    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    
    const isNearBottom = spaceBelow < 100;
    
    setDropdownDirection(isNearBottom ? 'up' : 'down');
  }, [direction]);

  const toggleDropdown = useCallback(() => {
    if (!isOpen) {
      calculateDirection();
    }
    setIsOpen((prev) => !prev);
  }, [isOpen, calculateDirection]);

  const handleSelection = useCallback(
    (option: string | number | IFloorOption) => {
      const value = isFloorOption(option) ? option.id : option;
      onChange(value);
      setIsOpen(false);
    },
    [onChange]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          toggleDropdown();
          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) toggleDropdown();
          // TODO: Add arrow key navigation through options
          break;
        case "ArrowUp":
          event.preventDefault();
          if (!isOpen) toggleDropdown();
          // TODO: Add arrow key navigation through options
          break;
      }
    },
    [isOpen, toggleDropdown]
  );

  // Update trigger width when opened
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownTrigger ref={triggerRef}>
        <DropdownButton
          isOpen={isOpen}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{getSelectedDisplay()}</span>
          <Icon iconName={"Chevron"} className="dropdown-icon" />
        </DropdownButton>
      </DropdownTrigger>

      {isOpen && (
        <DropdownList 
          width={triggerWidth} 
          direction={dropdownDirection}
          role="listbox"
        >
          {options.map((option, index) => {
            const isSelected = isFloorOption(option) 
              ? option.id === selectedValue 
              : option === selectedValue;
            
            const displayValue = isFloorOption(option) ? option.label : option.toString();
            const sensorCount = isFloorOption(option) ? option.sensorCount : undefined;
            
            const optionKey = isFloorOption(option) ? option.id : `${option}-${index}`;
            
            return (
              <DropdownItem
                key={optionKey}
                isSelected={isSelected}
                onClick={() => handleSelection(option)}
                role="option"
                aria-selected={isSelected}
              >
                <span className="item-main">{displayValue}</span>
                {showSensorCount && sensorCount !== undefined && (
                  <span className="item-meta">{sensorCount}</span>
                )}
              </DropdownItem>
            );
          })}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
