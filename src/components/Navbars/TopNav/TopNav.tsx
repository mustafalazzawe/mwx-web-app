import Button from "../../Button/Button";
import Logo from "../../Logo/Logo";
import { Icon } from "../../Icons/Icon";
import {
  Hamburger,
  TopNavButtons,
  TopNavCenter,
  TopNavLeft,
  TopNavRight,
  TopNavWrapper,
} from "./TopNav.styled";

const TopNav = () => {
  return (
    <TopNavWrapper>
      <TopNavLeft>
        <Logo />
      </TopNavLeft>

      <TopNavCenter>
        <TopNavButtons $activeButton="Model">
          <Button
            style={{ width: "128px", height: "100%" }}
            $variant={"Label"}
            $isTogglable
          >
            Model
          </Button>
          <Button
            style={{ width: "128px", height: "100%" }}
            $variant={"Label"}
            $isTogglable
          >
            Dashboard
          </Button>
        </TopNavButtons>
      </TopNavCenter>
      <TopNavRight>RIGHT</TopNavRight>
      <Hamburger>
        {/* TODO: Update to icon button */}
        <Icon iconName="Menu" fontSize="32px"></Icon>
      </Hamburger>
    </TopNavWrapper>
  );
};

export default TopNav;
