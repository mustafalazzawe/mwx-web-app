import { useNavigate, useLocation } from "react-router-dom";
import { useState, type FC } from "react";

import {
  Hamburger,
  TopNavButtons,
  TopNavCenter,
  TopNavLeft,
  TopNavRight,
  TopNavWrapper,
} from "./TopNav.styled";
import Logo from "../../Logo/Logo";
import Button from "../../Button/Button";
import SidePanel from "../../SidePanel/SidePanel";
import { Icon } from "../../Icons/Icon";
import type { TTopNavButtons } from "./TopNav.types";

const TopNav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

  // Determine active page from current route
  const getActivePageFromPath = (pathname: string): TTopNavButtons => {
    if (pathname === "/dashboard") return "Dashboard";
    return "Model"; // Default to Model for '/' or unknown routes
  };

  const activePage = getActivePageFromPath(location.pathname);

  const handlePageChange = (page: TTopNavButtons) => {
    const path = page === "Model" ? "/" : "/dashboard";
    navigate(path);
  };

  const handleHamburgerClick = (): void => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = (): void => {
    setIsSidePanelOpen(false);
  };

  const handleNotificationClick = (): void => {
    console.log("Notification Clicked");
  };

  const handleUserClick = (): void => {
    console.log("User Clicked");
  };

  return (
    <>
      <TopNavWrapper>
        <TopNavLeft>
          <Logo />
        </TopNavLeft>

        <TopNavCenter>
          <TopNavButtons $activeButton={activePage}>
            <Button
              style={{ width: "128px", height: "100%" }}
              $variant="Label"
              $isTogglable
              $isToggled={activePage === "Model"}
              $onToggle={() => handlePageChange("Model")}
            >
              Model
            </Button>
            <Button
              style={{ width: "128px", height: "100%" }}
              $variant="Label"
              $isTogglable
              $isToggled={activePage === "Dashboard"}
              $onToggle={() => handlePageChange("Dashboard")}
            >
              Dashboard
            </Button>
          </TopNavButtons>
        </TopNavCenter>

        <TopNavRight>
          <Button
            style={{ height: "100%" }}
            $variant="Icon"
            onClick={handleNotificationClick}
          >
            <Icon iconName="Notification" fontSize="24px" />
          </Button>
          <Button
            style={{ height: "100%" }}
            $variant="Icon"
            onClick={handleUserClick}
          >
            <Icon iconName="User" fontSize="24px" />
          </Button>
        </TopNavRight>

        <Hamburger>
          <Button
            style={{ padding: "16px 0 16px 16px" }}
            $variant="Icon"
            onClick={handleHamburgerClick}
          >
            <Icon iconName="Menu" fontSize="32px" />
          </Button>
        </Hamburger>
      </TopNavWrapper>

      {/* Side Panel for Mobile */}
      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} />
    </>
  );
};

export default TopNav;
