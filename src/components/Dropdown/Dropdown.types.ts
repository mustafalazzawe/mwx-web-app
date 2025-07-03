export interface IFloorOption {
  id: string;
  label: string;
  sensorCount?: number;
  isDefault?: boolean;
}

export interface IDropdownProps {
  options: string[] | number[] | IFloorOption[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  direction?: "up" | "down" | "auto";
  showSensorCount?: boolean;
}

// Type guards
export const isFloorOption = (
  option: string | number | IFloorOption
): option is IFloorOption => {
  return (
    typeof option === "object" &&
    option !== null &&
    "id" in option &&
    "label" in option
  );
};

export const isStringOrNumber = (
  option: string | number | IFloorOption
): option is string | number => {
  return typeof option === "string" || typeof option === "number";
};
