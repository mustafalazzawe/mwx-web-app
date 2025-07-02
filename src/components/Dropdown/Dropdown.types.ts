export interface IDropdownProps {
  options: string[] | number[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
}
