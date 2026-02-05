import Spinner from "./../../ui/Spinner";
import Table from "./../../ui/Table";
import CabinRow from "../../ui/TableRow";
import { useCabins } from "./useCabins";
import styled from "styled-components";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableWrapper = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 12px;

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

  /* Ensure border radius clips content */
  & > * {
    border-radius: 12px;
  }
`;

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  console.log(cabins);
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
  const sortBy = searchParams.get("sortBy") || "startData-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  console.log("🚀 ~ CabinTable ~ modifier:", modifier);
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );
  console.log("🚀 ~ CabinTable ~ sortedCabins:", sortedCabins);
  
  return (
    <TableWrapper>
      <Menus>
        <Table columns="2.4fr 1.2fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <span style={{ justifySelf: "self-start" }}></span>
            <span style={{ justifySelf: "start" }}>Cabin</span>
            <span style={{ justifySelf: "center" }}>Capacity</span>
            <span style={{ justifySelf: "center" }}>Price</span>
            <span style={{ justifySelf: "center" }}>Discount</span>
            <span style={{ justifySelf: "self-end" }}></span>
          </Table.Header>

          <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
          />
        </Table>
      </Menus>
    </TableWrapper>
  );
}
