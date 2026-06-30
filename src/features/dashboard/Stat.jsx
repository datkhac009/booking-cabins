import styled from 'styled-components';

const StyledStat = styled.div`
  position: relative;
  overflow: hidden;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: 2rem;
  display: grid;
  grid-template-columns: 5.6rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 3px;
    background-color: var(--color-${(props) => props.color}-700);
    opacity: 0.55;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  color: var(--color-grey-800);
  font-size: 2.6rem;
  line-height: 1;
  font-weight: 700;
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat color={color}>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
