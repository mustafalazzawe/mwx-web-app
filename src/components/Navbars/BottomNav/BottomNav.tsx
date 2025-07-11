import {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  type FC,
} from "react";

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

  // Touch/drag state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [currentTranslateY, setCurrentTranslateY] = useState<number>(0);

  const bottomNavRef = useRef<HTMLDivElement>(null);

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
      return [
        { id: "all", label: "All Floors", sensorCount: 0, isDefault: true },
      ];
    }

    const floorCounts = sensors.reduce((acc, sensor) => {
      const floorKey = String(sensor.floor).toLowerCase();
      acc[floorKey] = (acc[floorKey] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const floors: IFloorOption[] = [];

    floors.push({
      id: "all",
      label: "All Floors",
      sensorCount: sensors.length,
      isDefault: true,
    });

    const sortedFloorKeys = Object.keys(floorCounts).sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
      }

      if (!isNaN(aNum) && isNaN(bNum)) return -1;
      if (isNaN(aNum) && !isNaN(bNum)) return 1;

      return a.localeCompare(b);
    });

    sortedFloorKeys.forEach((floorKey) => {
      const count = floorCounts[floorKey];
      let label = "";
      const floorNum = parseInt(floorKey);

      if (!isNaN(floorNum)) {
        if (floorNum === 0 || floorKey === "ground") {
          label = "Ground Floor";
        } else {
          label = `Floor ${floorNum}`;
        }
      } else {
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

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!isMobile || !bottomNavRef.current) return;

      const touch = e.touches[0];
      setIsDragging(true);
      setDragStartY(touch.clientY);
      setCurrentTranslateY(0);
    },
    [isMobile]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !isMobile || !bottomNavRef.current) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - dragStartY;

      // Only allow downward movement when expanded, upward when collapsed
      if (isExpanded && deltaY > 0) {
        // Dragging down when expanded - allow closing
        setCurrentTranslateY(Math.min(deltaY, window.innerHeight * 0.6));
      } else if (!isExpanded && deltaY < 0) {
        // Dragging up when collapsed - allow opening
        setCurrentTranslateY(Math.max(deltaY, -window.innerHeight * 0.6));
      }
    },
    [isDragging, isMobile, dragStartY, isExpanded]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || !isMobile) return;

    setIsDragging(false);

    const threshold = 100; // Minimum distance to trigger state change
    const shouldToggle = Math.abs(currentTranslateY) > threshold;

    if (shouldToggle) {
      if (isExpanded && currentTranslateY > 0) {
        // Dragged down while expanded - close
        setIsExpanded(false);
      } else if (!isExpanded && currentTranslateY < 0) {
        // Dragged up while collapsed - open
        setIsExpanded(true);
      }
    }

    // Reset transform
    setCurrentTranslateY(0);
  }, [isDragging, isMobile, currentTranslateY, isExpanded]);

  // Check if mobile and attach event listeners
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

  // Attach touch event listeners
  useEffect(() => {
    if (!isMobile || !bottomNavRef.current) return;

    const element = bottomNavRef.current;

    // Touch events only - native mobile experience
    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

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

  // Calculate transforms for rubber band effect (mobile only)
  const getRubberBandHandleTransform = () => {
    if (!isDragging || !isMobile) return undefined;

    const handleMultiplier = 1.5;
    const handleMovement = currentTranslateY * handleMultiplier;

    return `translateY(${handleMovement}px)`;
  };

  const getRubberBandContentTransform = () => {
    if (!isDragging || !isMobile) return undefined;

    const resistance = 0.6;
    const contentMovement = currentTranslateY * resistance;

    const baseOffset = isExpanded ? 0 : window.innerHeight * 0.6;
    return `translateY(${baseOffset + contentMovement}px)`;
  };

  const getCollapsedOpacity = () => {
    if (!isDragging || !isMobile) return 1;

    const dragProgress =
      Math.abs(currentTranslateY) / (window.innerHeight * 0.25);
    return Math.max(0.2, 1 - dragProgress);
  };

  const getExpandedOpacity = () => {
    if (!isDragging || !isMobile) return isExpanded ? 1 : 0;

    const dragProgress =
      Math.abs(currentTranslateY) / (window.innerHeight * 0.25);
    return isExpanded ? 1 : Math.min(1, dragProgress * 1.2);
  };

  return (
    <Fragment>
      <BottomSheetOverlay
        $isVisible={isMobile && isExpanded}
        onClick={handleOverlayClick}
      />

      <BottomSheetHandle
        $isExpanded={isExpanded}
        onClick={toggleExpanded}
        style={{
          opacity: isDragging ? 0 : 1,
          transform: getRubberBandHandleTransform(),
          transition: isDragging
            ? "opacity 0.2s ease"
            : "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s ease",
        }}
      >
        <div className="handle" />
      </BottomSheetHandle>

      <BottomNavWrapper
        ref={bottomNavRef}
        $isMobile={isMobile}
        $isExpanded={isExpanded}
        style={{
          transition: isDragging
            ? "none"
            : "height 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      >
        {isMobile && isExpanded && (
          <BottomSheetHeader
            style={{
              ...(isMobile && {
                opacity: getExpandedOpacity(),
                transform: getRubberBandContentTransform(),
              }),
              transition: isDragging
                ? "none"
                : "opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          >
            <h2>Options</h2>
          </BottomSheetHeader>
        )}

        <CollapsedView
          $isExpanded={isExpanded}
          style={{
            ...(isMobile && {
              opacity: getCollapsedOpacity(),
            }),
            transform: "translateY(0px)",
            transition: isDragging
              ? "none"
              : "opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
          }}
        >
          <div className="collapsed-left">
            <span className="current-mode">{activeMode}</span>
            <div className="divider" />
            <span className="current-floor">{getCurrentFloorLabel()}</span>
          </div>
        </CollapsedView>

        <BottomNavContent
          $isExpanded={isExpanded}
          style={{
            ...(isMobile && {
              opacity: getExpandedOpacity(),
              transform: getRubberBandContentTransform(),
            }),
            transition: isDragging
              ? "none"
              : "opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
          }}
        >
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
