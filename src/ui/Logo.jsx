import styled from "styled-components";
import logo from "../data/cabins/7374372.jpg";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 15.6rem;
  width: auto;
  object-fit: contain;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={logo} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
