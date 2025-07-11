import { useLocation, useNavigate } from "react-router-dom";
import type { FC } from "react";

import { Icon } from "../Icons/Icon";
import {
  NavigationList,
  NavigationSection,
  SidePanelContainer,
  SidePanelContent,
  SidePanelHeader,
  SidePanelOverlay,
} from "./SidePanel.styled";
import Button from "../Button/Button";
import type { TTopNavButtons } from "../Navbars/TopNav/TopNav.types";
import type { ISidePanelProps } from "./SidePanel.types";

const SidePanel: FC<ISidePanelProps> = (props) => {
  const { isOpen, onClose } = props;

  const navigate = useNavigate();
  const location = useLocation();

  // Determine active page from current route
  const getActivePageFromPath = (pathname: string): TTopNavButtons => {
    if (pathname === "/dashboard") return "Dashboard";
    return "Model";
  };

  const activePage = getActivePageFromPath(location.pathname);

  const handlePageChange = (page: TTopNavButtons): void => {
    const path = page === "Model" ? "/" : "/dashboard";
    navigate(path);

    onClose();
  };

  const handleNotificationClick = (): void => {
    console.log("Notification Clicked");

    onClose();
  };

  const handleUserClick = (): void => {
    console.log("User Clicked");

    onClose();
  };

  // Close panel when clicking overlay
  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <SidePanelOverlay
      isOpen={isOpen}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <SidePanelContainer isOpen={isOpen}>
        <SidePanelHeader>
          <h3>Navigation</h3>
          <Button $variant={"Icon"} onClick={onClose}>
            <Icon iconName={"Cross"} fontSize="24px" />
          </Button>
        </SidePanelHeader>

        <SidePanelContent>
          <NavigationSection>
            <h4>Pages</h4>
            <NavigationList>
              <Button
                style={{ padding: "16px 24px", textAlign: "left" }}
                $variant={"Tertiary"}
                $isTogglable
                $isToggled={activePage === "Model"}
                $onToggle={() => handlePageChange("Model")}
              >
                <span className="nav-label">Model</span>
              </Button>

              <Button
                style={{ padding: "16px 24px", textAlign: "left" }}
                $variant={"Tertiary"}
                $isTogglable
                $isToggled={activePage === "Dashboard"}
                $onToggle={() => handlePageChange("Dashboard")}
              >
                <span className="nav-label">Dashboard</span>
              </Button>
            </NavigationList>
          </NavigationSection>

          <NavigationSection>
            <h4>Actions</h4>
            <NavigationList>
              <Button
                style={{ padding: "16px 24px", textAlign: "left" }}
                $variant={"Tertiary"}
                onClick={handleNotificationClick}
              >
                <span className="nav-icon">
                  <Icon iconName="Notification" fontSize="20px" />
                </span>
                <span className="nav-label">Notifications</span>
              </Button>

              <Button
                style={{ padding: "16px 24px", textAlign: "left" }}
                $variant={"Tertiary"}
                onClick={handleUserClick}
              >
                <span className="nav-icon">
                  <Icon iconName="User" fontSize="20px" />
                </span>
                <span className="nav-label">Account</span>
              </Button>
            </NavigationList>
          </NavigationSection>
        </SidePanelContent>
      </SidePanelContainer>
    </SidePanelOverlay>
  );
};

export default SidePanel;
