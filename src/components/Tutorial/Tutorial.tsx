import { type FC, useEffect, useState } from "react";
import Button from "../Button/Button";
import {
  TutorialOverlay,
  TutorialCard,
  TutorialHeader,
  TutorialContent,
  ControlsList,
  ControlItem,
  ControlIcon,
  ControlDetails,
  TutorialActions,
} from "./Tutorial.styled";
import type { ITutorialProps } from "./Tutorial.types";

const Tutorial: FC<ITutorialProps> = ({ onDismiss }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = (): void => {
      const width = window.innerWidth;
      const isMobileView = width <= 479; // Mobile breakpoint from your theme
      setIsMobile(isMobileView);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileControls = [
    {
      icon: "👆",
      title: "Tap to Select",
      description:
        "Tap on buildings, sensors, and other model parts to select them",
    },
    {
      icon: "🤏",
      title: "Pinch to Zoom",
      description: "Pinch fingers together or apart to zoom in and out",
    },
    {
      icon: "🔄",
      title: "Drag to Rotate",
      description: "Use one finger to drag and rotate around the model",
    },
    {
      icon: "✋",
      title: "Two-Finger Pan",
      description: "Drag with two fingers to move around the scene",
    },
  ];

  const desktopControls = [
    {
      icon: "🖱️",
      title: "Left Click + Drag",
      description: "Rotate around the model to view from different angles",
    },
    {
      icon: "✋",
      title: "Right Click + Drag",
      description: "Pan the view to move around the scene",
    },
    {
      icon: "🔄",
      title: "Scroll Wheel",
      description: "Zoom in and out to get closer or see more of the model",
    },
    {
      icon: "👆",
      title: "Click Objects",
      description:
        "Select and interact with buildings, sensors, and other model parts",
    },
  ];

  const controls = isMobile ? mobileControls : desktopControls;
  const title = "3D Model Controls";
  const subtitle = "Learn how to navigate and interact with the model";

  return (
    <TutorialOverlay onClick={onDismiss}>
      <TutorialCard onClick={(e) => e.stopPropagation()}>
        <TutorialHeader>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </TutorialHeader>

        <TutorialContent>
          <ControlsList>
            {controls.map((control, index) => (
              <ControlItem key={index}>
                <ControlIcon>
                  <span>{control.icon}</span>
                </ControlIcon>
                <ControlDetails>
                  <h3 className="control-title">{control.title}</h3>
                  <p className="control-description">{control.description}</p>
                </ControlDetails>
              </ControlItem>
            ))}
          </ControlsList>
        </TutorialContent>

        <TutorialActions>
          <Button $variant="Primary" onClick={onDismiss} style={{width: "100%"}}>
            Got it!
          </Button>
        </TutorialActions>
      </TutorialCard>
    </TutorialOverlay>
  );
};

export default Tutorial;
