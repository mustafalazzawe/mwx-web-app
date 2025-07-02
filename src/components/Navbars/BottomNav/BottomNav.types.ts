export type TBottomModes = "Overview" | "Sensors" | "Scenario";

export interface IBottomModes {
  $activeButton: TBottomModes;
}

export interface IBottomNavProps {
  activeMode: TBottomModes;
  onModeChange: (mode: TBottomModes) => void;
}
