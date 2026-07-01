import styled, { css } from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  color: var(--color-grey-700);
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;

  ${(props) =>
    props.active &&
    css`
      border-color: var(--color-brand-600);
      box-shadow: 0 0 0 3px var(--color-brand-100);
      color: var(--color-brand-700);
    `}

  &:hover,
  &:focus,
  &:active {
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px var(--color-brand-100);
    color: var(--color-brand-700);
  }

  & option:checked {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Select({ options, value, onChange, active = false }) {
  return (
    <div>
      <StyledSelect value={value} onChange={onChange} active={active}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
}

export default Select;
