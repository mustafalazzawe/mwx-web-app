import { useNavigate, useLocation } from "react-router-dom";
import type { FC } from "react";

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
import { Icon } from "../../Icons/Icon";
import type { TTopNavButtons } from "./TopNav.types";

const TopNav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
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
          $variant="Icon"
          onClick={() => console.log("Notification Clicked")}
        >
          <Icon iconName="Notification" fontSize="20px" />
        </Button>
        <Button $variant="Icon" onClick={() => console.log("User Clicked")}>
          <Icon iconName="User" fontSize="20px" />
        </Button>
      </TopNavRight>

      <Hamburger>
        <Button $variant="Icon" onClick={() => console.log("Menu Clicked")}>
          <Icon iconName="Menu" fontSize="32px" />
        </Button>
      </Hamburger>
    </TopNavWrapper>
  );
};

export default TopNav;
