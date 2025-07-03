import type { FC } from "react";
import Button from "../Button/Button";
import { TutorialWrapper } from "./Tutorial.styled";
import type { ITutorialProps } from "./Tutorial.types";

// TODO: Update tutorial component

const Tutorial: FC<ITutorialProps> = ({ onDismiss }) => {
  return (
    <TutorialWrapper>
      <div className="controls-content">
        <h2>Model Controls</h2>
        <div className="controls-list">
          <div className="control-item">
            <span className="control-icon">🖱️</span>
            <div>
              <strong>Left Click + Drag</strong>
              <p>Rotate around the model</p>
            </div>
          </div>

          <div className="control-item">
            <span className="control-icon">🖱️</span>
            <div>
              <strong>Right Click + Drag</strong>
              <p>Pan the view</p>
            </div>
          </div>

          <div className="control-item">
            <span className="control-icon">🔄</span>
            <div>
              <strong>Scroll Wheel</strong>
              <p>Zoom in and out</p>
            </div>
          </div>

          <div className="control-item">
            <span className="control-icon">👆</span>
            <div>
              <strong>Click Objects</strong>
              <p>Select and interact with model parts</p>
            </div>
          </div>
        </div>

        <div className="controls-actions">
          <Button $variant="Label" onClick={onDismiss}>
            Got it!
          </Button>
        </div>
      </div>
    </TutorialWrapper>
  );
};

export default Tutorial;
