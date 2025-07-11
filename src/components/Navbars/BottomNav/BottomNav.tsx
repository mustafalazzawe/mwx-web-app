import { Fragment, useEffect, useState, type FC } from "react";

import {
  BottomNavContent,
  BottomNavLeft,
  BottomNavRight,
  BottomNavWrapper,
  BottomSheetHandle,
  BottomSheetHeader,
  BottomSheetOverlay,
  CollapsedView,
  MobileModeGrid,
  MobileSection,
} from "./BottomNav.styled";
import Button from "../../Button/Button";
import { Label } from "../../Label/Label.styled";
import type { IBottomNavProps, TBottomModes } from "./BottomNav.types";
import Dropdown from "../../Dropdown/Dropdown";
import type { IFloorOption } from "../../Dropdown/Dropdown.types";

const BottomNav: FC<IBottomNavProps> = (props) => {
  const { activeMode, onModeChange } = props;

  const [selectedFloor, setSelectedFloor] = useState<string>("all");

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = (): void => {
      const width = window.innerWidth;
      const isMobileView = width <= 991;

      setIsMobile(isMobileView);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleModeToggle = (mode: TBottomModes) => {
    // If clicking the same mode, don't change (keep it active)
    // If clicking a different mode, switch to it
    if (mode !== activeMode) {
      onModeChange(mode);

      if (isMobile) {
        setIsExpanded(false);
      }
    }
  };

  const handleFloorChange = (floorId: string | number) => {
    // TODO: Implement floor change logic
    const floorIdString = floorId.toString();
    setSelectedFloor(floorIdString);

    console.log(`Floor changed to: ${floorIdString}`);

    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleOverlayClick = (): void => {
    setIsExpanded(false);
  };

  const getCurrentFloorLabel = (): string => {
    const currentFloor = floorOptions.find(
      (floor) => floor.id === selectedFloor
    );
    return currentFloor ? currentFloor.label : "Select Floor";
  };

  return (
    <Fragment>
      <BottomSheetOverlay
        $isVisible={isMobile && isExpanded}
        onClick={handleOverlayClick}
      />

      <BottomSheetHandle $isExpanded={isExpanded} onClick={toggleExpanded}>
        <div className="handle" />
      </BottomSheetHandle>

      <BottomNavWrapper $isMobile={isMobile} $isExpanded={isExpanded}>
        {isMobile && isExpanded && (
          <BottomSheetHeader>
            <h2>Options</h2>
          </BottomSheetHeader>
        )}

        <CollapsedView $isExpanded={isExpanded}>
          <div className="collapsed-left">
            <span className="current-mode">{activeMode}</span>
            <div className="divider" />
            <span className="current-floor">{getCurrentFloorLabel()}</span>
          </div>
        </CollapsedView>

        <BottomNavContent $isExpanded={isExpanded}>
          <BottomNavLeft>
            {!isMobile && (
              <Fragment>
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
              </Fragment>
            )}

            {isMobile && (
              <MobileSection>
                <div className="section-label">Mode</div>
                <MobileModeGrid>
                  {modes.map(({ key, label }) => (
                    <Button
                      key={key}
                      $variant="Primary"
                      $isTogglable
                      $isToggled={activeMode === key}
                      $onToggle={() => handleModeToggle(key)}
                    >
                      {label}
                    </Button>
                  ))}
                </MobileModeGrid>
              </MobileSection>
            )}
          </BottomNavLeft>

          <BottomNavRight>
            {!isMobile && (
              <Fragment>
                <Label>Floor:</Label>
                <Dropdown
                  options={floorOptions}
                  selectedValue={selectedFloor}
                  onChange={handleFloorChange}
                  direction="up"
                  showSensorCount={false}
                  placeholder="Select Floor"
                  variant={"Label"}
                  className="bottom-nav-dropdown"
                />
              </Fragment>
            )}

            {isMobile && (
              <MobileSection>
                <div className="section-label">Floor</div>
                <div className="section-content">
                  <Dropdown
                    options={floorOptions}
                    selectedValue={selectedFloor}
                    onChange={handleFloorChange}
                    direction="down"
                    showSensorCount={false}
                    placeholder="Select Floor"
                    variant="Primary"
                  />
                </div>
              </MobileSection>
            )}
          </BottomNavRight>
        </BottomNavContent>
      </BottomNavWrapper>
    </Fragment>
  );
};

export default BottomNav;