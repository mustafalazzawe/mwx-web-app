import { Fragment, useEffect, useState, useMemo, type FC } from "react";

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
import type { IBottomNavProps, TBottomModes } from "./BottomNav.types";

import Button from "../../Button/Button";
import FloorDropdown from "../../Dropdown/src/FloorDropdown";
import { Label } from "../../Label/Label.styled";
import type { IFloorOption } from "../../Dropdown/src/FloorDropdown";

import { useSensorData } from "../../../hooks/useSensorData";

const BottomNav: FC<IBottomNavProps> = (props) => {
  const { activeMode, onModeChange } = props;

  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Get sensor data
  const { sensors, isLoading } = useSensorData();

  const modes: Array<{ key: TBottomModes; label: string }> = [
    { key: "Overview", label: "Overview" },
    { key: "Sensors", label: "Sensors" },
    { key: "Scenario", label: "Scenario" },
  ];

  // Calculate floor options from sensor data
  const floorOptions: IFloorOption[] = useMemo(() => {
    if (!sensors || sensors.length === 0) {
      // Return default option if no sensor data
      return [
        { id: "all", label: "All Floors", sensorCount: 0, isDefault: true },
      ];
    }

    // Count sensors by floor
    const floorCounts = sensors.reduce((acc, sensor) => {
      const floorKey = String(sensor.floor).toLowerCase();
      acc[floorKey] = (acc[floorKey] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Create floor options array
    const floors: IFloorOption[] = [];

    // Add "All Floors" option
    floors.push({
      id: "all",
      label: "All Floors",
      sensorCount: sensors.length,
      isDefault: true,
    });

    // Sort floor keys and create individual floor options
    const sortedFloorKeys = Object.keys(floorCounts).sort((a, b) => {
      // Handle numeric vs string floors
      const aNum = parseInt(a);
      const bNum = parseInt(b);

      // If both are numbers, sort numerically
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
      }

      // Otherwise sort alphabetically, but put numeric floors first
      if (!isNaN(aNum) && isNaN(bNum)) return -1;
      if (isNaN(aNum) && !isNaN(bNum)) return 1;

      return a.localeCompare(b);
    });

    sortedFloorKeys.forEach((floorKey) => {
      const count = floorCounts[floorKey];

      // Create readable floor labels
      let label = "";
      const floorNum = parseInt(floorKey);

      if (!isNaN(floorNum)) {
        if (floorNum === 0 || floorKey === "ground") {
          label = "Ground Floor";
        } else {
          label = `Floor ${floorNum}`;
        }
      } else {
        // Handle special cases like "roof", "basement", etc.
        label = floorKey.charAt(0).toUpperCase() + floorKey.slice(1);
      }

      floors.push({
        id: floorKey,
        label,
        sensorCount: count,
        isDefault: false,
      });
    });

    return floors;
  }, [sensors]);

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
    if (mode !== activeMode) {
      onModeChange(mode);

      if (isMobile) {
        setIsExpanded(false);
      }
    }
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const floorId = event.target.value;
    setSelectedFloor(floorId);

    console.log(`Floor changed to: ${floorId}`);

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
                <FloorDropdown
                  options={floorOptions}
                  value={selectedFloor}
                  onChange={handleFloorChange}
                  showSensorCount={false}
                  placeholder={isLoading ? "Loading..." : "Select Floor"}
                  $variant="Label"
                  $useCustomList={true}
                  disabled={isLoading}
                  className="bottom-nav-dropdown"
                />
              </Fragment>
            )}

            {isMobile && (
              <MobileSection>
                <div className="section-label">Floor</div>
                <div className="section-content">
                  <FloorDropdown
                    options={floorOptions}
                    value={selectedFloor}
                    onChange={handleFloorChange}
                    showSensorCount={false}
                    placeholder={isLoading ? "Loading..." : "Select Floor"}
                    $variant="Primary"
                    $useCustomList={true}
                    disabled={isLoading}
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
