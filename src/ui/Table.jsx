// src/ui/Table.jsx
import styled from "styled-components";
import { createContext, useContext } from "react";

const TableContext = createContext();

const StyledTable = styled.div`
  background: var(--color-grey-0);
  border-radius: 12px;
  border: 1px solid var(--color-grey-200);
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.06);
  overflow: visible;
`;


const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.columns || "2fr 1fr 1fr 1fr 1fr"};
  column-gap: 2.4rem;
  align-items: center;
  transition: background-color 160ms ease;
  /* giúp nội dung bám lề trái gọn gàng */
  & > * {
    justify-self: start;
  }
  & > *:last-child {
    justify-self: end; /* ví dụ nút actions ở cột cuối */
  }

  @media (max-width: 900px) {
    grid-template-columns: ${(p) =>
      p.columnsMobile || "1.6fr 1fr 1fr"}; /* gộp cột ở mobile */
    column-gap: 1.6rem;
  }
`;

const StyledHeader = styled(CommonRow)`
    position: sticky;
 top: 0;
  z-index: 1;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 700;
  color: var(--color-grey-700);
`;

const StyledBody = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2rem;
  background-color: var(--color-grey-0);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  /* zebra */
  &:nth-child(even) {
    background-color: var(--color-grey-50);
  }

  /* hover */
  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  color: var(--color-grey-600);
`;

/* ==== Public API ==== */
function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.Header = function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader columns={columns}>
      {children}
    </StyledHeader>
  );
};

Table.Body = function Body({ data, render }) {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;
  
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Row = function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns}>
      {children}
    </StyledRow>
  );
};

Table.Footer = function TFooter({ children }) {
  return <Footer>{children}</Footer>;
};

Table.Empty = Empty;

export default Table;
