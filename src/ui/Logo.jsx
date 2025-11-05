import styled from "styled-components";

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
      <Img src="src/data/cabins/7374372.jpg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
