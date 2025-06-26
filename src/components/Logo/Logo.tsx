import { LogoImg, LogoWrapper } from "./Logo.styled";

import logo from "../../assets/mwx_logo.png";

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoImg src={logo} />
    </LogoWrapper>
  );
};

export default Logo;
