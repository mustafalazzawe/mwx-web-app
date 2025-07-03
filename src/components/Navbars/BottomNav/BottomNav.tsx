import { useState, type FC } from "react";

import {
  BottomNavLeft,
  BottomNavRight,
  BottomNavWrapper,
} from "./BottomNav.styled";
import Button from "../../Button/Button";
import { Label } from "../../Label/Label.styled";
import type { IBottomNavProps, TBottomModes } from "./BottomNav.types";
import Dropdown from "../../Dropdown/Dropdown";
import type { IFloorOption } from "../../Dropdown/Dropdown.types";

const BottomNav: FC<IBottomNavProps> = (props) => {
  const { activeMode, onModeChange } = props;

  const [selectedFloor, setSelectedFloor] = useState<string>("all");

  const modes: Array<{ key: TBottomModes; label: string }> = [
    { key: "Overview", label: "Overview" },
    { key: "Sensors", label: "Sensors" },
    { key: "Scenario", label: "Scenario" },
  ];

  // TEMP: Dummy floor / sensor data
  const floorOptions: IFloorOption[] = [
    { id: "all", label: "All Floors", sensorCount: 24, isDefault: true },
    { id: "ground", label: "Ground Floor", sensorCount: 8 },
    { id: "floor1", label: "Floor 1", sensorCount: 10 },
    { id: "floor2", label: "Floor 2", sensorCount: 6 },
    { id: "floor3", label: "Floor 3", sensorCount: 13 },
    { id: "floor4", label: "Floor 4", sensorCount: 1 },
  ];

  const handleModeToggle = (mode: TBottomModes) => {
    // If clicking the same mode, don't change (keep it active)
    // If clicking a different mode, switch to it
    if (mode !== activeMode) {
      onModeChange(mode);
    }
  };

  const handleFloorChange = (floorId: string | number) => {
    // TODO: Implement floor change logic
    const floorIdString = floorId.toString();
    setSelectedFloor(floorIdString);

    console.log(`Floor changed to: ${floorIdString}`);
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
        <Label>Floor:</Label>
        <Dropdown
          options={floorOptions}
          selectedValue={selectedFloor}
          onChange={handleFloorChange}
          direction="up"
          showSensorCount={false}
          placeholder="Select Floor"
        />
      </BottomNavRight>
    </BottomNavWrapper>
  );
};

export default BottomNav;
