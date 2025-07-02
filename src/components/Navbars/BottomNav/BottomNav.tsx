import type { FC } from "react";

import {
  BottomNavLeft,
  BottomNavRight,
  BottomNavWrapper,
} from "./BottomNav.styled";
import Button from "../../Button/Button";
import { Label } from "../../Label/Label.styled";
import type { IBottomNavProps, TBottomModes } from "./BottomNav.types";

const BottomNav: FC<IBottomNavProps> = (props) => {
  const { activeMode, onModeChange } = props;

  const modes: Array<{ key: TBottomModes; label: string }> = [
    { key: "Overview", label: "Overview" },
    { key: "Sensors", label: "Sensors" },
    { key: "Scenario", label: "Scenario" },
  ];

  const handleModeToggle = (mode: TBottomModes) => {
    // If clicking the same mode, don't change (keep it active)
    // If clicking a different mode, switch to it
    if (mode !== activeMode) {
      onModeChange(mode);
    }
  };

  return (
    <BottomNavWrapper>
      <BottomNavLeft>
        <Label>Mode:</Label>
        {modes.map(({ key, label }) => (
          <Button
            key={key}
            $variant="Label"
            $isTogglable
            $isToggled={activeMode === key}
            $onToggle={() => handleModeToggle(key)}
          >
            {label}
          </Button>
        ))}
      </BottomNavLeft>

      <BottomNavRight>
        <div>Dropdown</div>
      </BottomNavRight>
    </BottomNavWrapper>
  );
};

export default BottomNav;
