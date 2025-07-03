import { useLocation, useNavigate } from "react-router-dom";
import type { FC } from "react";

import type { ISidePanelProps } from "./SidePanel.types";
import { Icon } from "../Icons/Icon";
import type { TTopNavButtons } from "../Navbars/TopNav/TopNav.types";
import {
  CloseButton,
  NavigationItem,
  NavigationList,
  NavigationSection,
  SidePanelContainer,
  SidePanelContent,
  SidePanelHeader,
  SidePanelOverlay,
} from "./SidePanel.styled";

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
    onClose(); // Close panel after navigation
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
          <CloseButton onClick={onClose} aria-label="Close navigation">
            <Icon iconName={"Cross"} fontSize="20px" />
          </CloseButton>
        </SidePanelHeader>

        <SidePanelContent>
          {/* Main Navigation */}
          <NavigationSection>
            <h4>Pages</h4>
            <NavigationList>
              <NavigationItem
                isActive={activePage === "Model"}
                onClick={() => handlePageChange("Model")}
              >
                <span className="nav-icon">M</span>
                <span className="nav-label">3D Model</span>
              </NavigationItem>

              <NavigationItem
                isActive={activePage === "Dashboard"}
                onClick={() => handlePageChange("Dashboard")}
              >
                <span className="nav-icon">D</span>
                <span className="nav-label">Dashboard</span>
              </NavigationItem>
            </NavigationList>
          </NavigationSection>

          {/* Account Actions */}
          <NavigationSection>
            <h4>Account</h4>
            <NavigationList>
              <NavigationItem onClick={handleNotificationClick}>
                <span className="nav-icon">
                  <Icon iconName="Notification" fontSize="20px" />
                </span>
                <span className="nav-label">Notifications</span>
              </NavigationItem>

              <NavigationItem onClick={handleUserClick}>
                <span className="nav-icon">
                  <Icon iconName="User" fontSize="20px" />
                </span>
                <span className="nav-label">Account Settings</span>
              </NavigationItem>
            </NavigationList>
          </NavigationSection>
        </SidePanelContent>
      </SidePanelContainer>
    </SidePanelOverlay>
  );
};

export default SidePanel;
