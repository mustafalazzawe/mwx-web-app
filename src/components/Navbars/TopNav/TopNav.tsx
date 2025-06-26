import Button from "../../Button/Button";
import { Icon } from "../../Icons/Icon";
import Logo from "../../Logo/Logo";
import {
  Hamburger,
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
        <div style={{ borderBottom: "1.5px solid rgba(255, 255, 255, 0.00)" }}>
          <Button style={{ width: "128px" }} $variant={"Label"}>
            Model
          </Button>
        </div>
        <Button style={{ width: "128px" }} $variant={"Label"}>
          Dashboard
        </Button>
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
