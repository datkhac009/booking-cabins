import Spinner from "./../../ui/Spinner";
import Table from "./../../ui/Table";
import CabinRow from "./CabinRow";  // ✅ Fixed import
import { useCabins } from "./useCabins";
import styled from "styled-components";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

const TableWrapper = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-400);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-500);
  }

  & > * {
    min-width: 82rem;
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }

`;

const PAGE_SIZE = 5;

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  //Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  else if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  else if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  
  //Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (typeof a[field] === "string")
      return a[field].localeCompare(b[field]) * modifier;

    return (a[field] - b[field]) * modifier;
  });

  // Pagination
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const paginatedCabins = sortedCabins.slice(from, to);
  
  return (
    <TableWrapper>
      <Menus>
        <Table columns="9.6rem minmax(16rem, 1.4fr) 1fr 1fr 1fr 4.8rem">
          <Table.Header>
            <span style={{ justifySelf: "start" }}>Image</span>
            <span style={{ justifySelf: "start" }}>Cabin</span>
            <span>Capacity</span>
            <span>Price</span>
            <span>Discount</span>
            <span></span>
          </Table.Header>

          <Table.Body
            data={paginatedCabins}
            render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
          />

          <Table.Footer>
            <Pagination count={sortedCabins.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </TableWrapper>
  );
}
