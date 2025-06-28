import Button from "../../Button/Button";
import { SubNavButtons, SubNavCenter, SubNavWrapper } from "./SubNav.styled";

const SubNav = () => {
  return (
    <SubNavWrapper>
      <SubNavCenter>
        <SubNavButtons $activeButton={"Overview"}>
          <Button
            style={{ width: "128px", height: "100%" }}
            $variant="Label"
            $isTogglable
            $isToggled={true}
            $onToggle={() => console.log("click")}
          >
            Overview
          </Button>
          <Button
            style={{ width: "128px", height: "100%" }}
            $variant="Label"
            $isTogglable
            $isToggled={false}
            $onToggle={() => console.log("click")}
          >
            Historical
          </Button>
        </SubNavButtons>
      </SubNavCenter>
    </SubNavWrapper>
  );
};

export default SubNav;
