import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 15.6rem;
  width: auto;
  object-fit: contain;
`;

function Logo() {
  const{isDarkMode} = useDarkMode()
  const srcLogo = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
   return (
    <StyledLogo>
      <Img src={srcLogo} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
