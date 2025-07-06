import { useEffect, useState, type FC } from "react";

import {
  BottomNavContent,
  BottomNavLeft,
  BottomNavRight,
  BottomNavWrapper,
  BottomSheetHandle,
  CollapsedView,
  MobileModeGrid,
  MobileSection,
} from "./BottomNav.styled";
import Button from "../../Button/Button";
import { Label } from "../../Label/Label.styled";
import type { IBottomNavProps, TBottomModes } from "./BottomNav.types";
import Dropdown from "../../Dropdown/Dropdown";
import type { IFloorOption } from "../../Dropdown/Dropdown.types";
import { useTheme } from "styled-components";

const BottomNav: FC<IBottomNavProps> = (props) => {
  const { activeMode, onModeChange } = props;

  const theme = useTheme();

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= Number(theme.breakpoints.tablet.max));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [theme.breakpoints.tablet.max]);

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
    setIsExpanded(prev => !prev);
  };

    const getCurrentFloorLabel = (): string => {
    const currentFloor = floorOptions.find(floor => floor.id === selectedFloor);
    return currentFloor ? currentFloor.label : "Select Floor";
  };

    return (
    <BottomNavWrapper $isMobile={isMobile} $isExpanded={isExpanded}>
      {/* Mobile: Handle for expanding/collapsing */}
      <BottomSheetHandle onClick={toggleExpanded} />
      
      {/* Mobile: Collapsed view showing current selections */}
      <CollapsedView $isExpanded={isExpanded}>
        <div className="collapsed-left">
          <span className="current-mode">{activeMode}</span>
          <div className="divider" />
          <span className="current-floor">{getCurrentFloorLabel()}</span>
        </div>
        <div className="collapsed-right">
          <Button $variant="Icon" onClick={toggleExpanded}>
            ▲
          </Button>
        </div>
      </CollapsedView>

      {/* Content: Desktop always visible, Mobile only when expanded */}
      <BottomNavContent $isExpanded={isExpanded}>
        {/* Desktop layout OR Mobile expanded layout */}
        <BottomNavLeft>
          {/* Desktop: Horizontal label + buttons */}
          <Label style={{ display: isMobile ? 'none' : 'block' }}>Mode:</Label>
          
          {/* Mobile: Section with grid */}
          <MobileSection>
            <div className="section-label">Mode Selection</div>
            <MobileModeGrid>
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
            </MobileModeGrid>
          </MobileSection>

          {/* Desktop: Horizontal buttons */}
          {!isMobile && modes.map(({ key, label }) => (
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
          {/* Desktop: Horizontal label + dropdown */}
          <Label style={{ display: isMobile ? 'none' : 'block' }}>Floor:</Label>
          
          {/* Mobile: Section */}
          <MobileSection>
            <div className="section-label">Floor Selection</div>
            <div className="section-content">
              <Dropdown
                options={floorOptions}
                selectedValue={selectedFloor}
                onChange={handleFloorChange}
                direction={isMobile ? "down" : "up"} // Down on mobile when expanded
                showSensorCount={true}
                placeholder="Select Floor"
              />
            </div>
          </MobileSection>

          {/* Desktop: Regular dropdown */}
          {!isMobile && (
            <Dropdown
              options={floorOptions}
              selectedValue={selectedFloor}
              onChange={handleFloorChange}
              direction="up"
              showSensorCount={false}
              placeholder="Select Floor"
            />
          )}
        </BottomNavRight>
      </BottomNavContent>
    </BottomNavWrapper>
  );
};

export default BottomNav;

    // <BottomNavWrapper>
    //   <BottomNavLeft>
    //     <Label>Mode:</Label>
    //     {modes.map(({ key, label }) => (
    //       <Button
    //         key={key}
    //         $variant="Label"
    //         $isTogglable
    //         $isToggled={activeMode === key}
    //         $onToggle={() => handleModeToggle(key)}
    //       >
    //         {label}
    //       </Button>
    //     ))}
    //   </BottomNavLeft>

    //   <BottomNavRight>
    //     <Label>Floor:</Label>
    //     <Dropdown
    //       options={floorOptions}
    //       selectedValue={selectedFloor}
    //       onChange={handleFloorChange}
    //       direction="up"
    //       showSensorCount={false}
    //       placeholder="Select Floor"
    //     />
    //   </BottomNavRight>
    // </BottomNavWrapper>

