import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "18rem minmax(0,1fr) auto"};
  column-gap: ${(props) => (props.orientation === "vertical" ? "0" : "2.4rem")};
  row-gap: 0.8rem;
  padding: 1.2rem 0;

  &:first-child { padding-top: 0; }
  &:last-child  { padding-bottom: 0; }

  &:not(:last-child) {
    border-bottom: ${(props) =>
      props.orientation === "vertical" ? "none" : "1px solid var(--color-grey-100)"};
  }

  /* Hàng chứa button (khi KHÔNG vertical) */
  ${(props) =>
    props.orientation !== "vertical" &&
    css`
      &:has(button) {
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 1.2rem;
        justify-items: end;
      }
    `}

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    border-bottom: 1px solid var(--color-grey-100);
    &:has(button) {
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
      border-bottom: none;
      padding-top: 1.6rem;
    }
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Error = styled.span`
  font-size: 1.3rem;
  color: var(--color-red-700);
  justify-self: end;
`;

function FormRow({ label, error, children, orientation }) {
  return (
    <StyledFormRow orientation={orientation}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
export default FormRow;
