import type { FC } from "react";
import type { IDropdownProps } from "../Dropdown.types";
import Dropdown from "../Dropdown";

export interface IFloorOption {
  id: string;
  label: string;
  sensorCount?: number;
  isDefault?: boolean;
}

interface IFloorDropdownProps extends Omit<IDropdownProps, "children"> {
  options: IFloorOption[];
  showSensorCount?: boolean;
  placeholder?: string;
}

const FloorDropdown: FC<IFloorDropdownProps> = ({
  options,
  showSensorCount = false,
  placeholder,
  ...props
}) => {
  return (
    <Dropdown {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => {
        const displayLabel =
          showSensorCount && option.sensorCount !== undefined
            ? `${option.label} (${option.sensorCount})`
            : option.label;

        return (
          <option key={option.id} value={option.id}>
            {displayLabel}
          </option>
        );
      })}
    </Dropdown>
  );
};

export default FloorDropdown;
