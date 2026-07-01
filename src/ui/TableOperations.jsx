import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1.6rem;

  & > * {
    margin-bottom: 0;
  }

  @media (max-width: 680px) {
    justify-content: stretch;

    & > * {
      width: 100%;
    }
  }
`;

export default TableOperations;
