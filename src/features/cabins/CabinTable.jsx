import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { apiCabins } from "../../services/apiCabins";
import Spinner from "./../../ui/Spinner";
import Table from "./../../ui/Table";
import CabinRow from "../../ui/TableRow";
import { Toaster } from "react-hot-toast";
// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
export default function CabinTable() {
  const {data:cabins , isLoading , error} = useQuery({
    queryKey: ['cabins'],
    queryFn: apiCabins,
  });
  if(error) throw new Error("Error Cabin");
  
  console.log(cabins);
  if(isLoading) return <Spinner />
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <Table>
        <Table.Header columns="2.4fr 1.2fr 1fr 1fr 1fr 1fr">
          <span style={{ justifySelf: "self-start" }}></span>
          <span style={{ justifySelf: "start" }}>Cabin</span>
          <span style={{ justifySelf: "center" }}>Capacity</span>
          <span style={{ justifySelf: "center" }}>Price</span>
          <span style={{ justifySelf: "center" }}>Discount</span>
          <span style={{ justifySelf: "self-end" }}></span>
          <span /> {/* cột actions */}
        </Table.Header>
        <Table.Body>
          {cabins.length === 0 ? (
            <Table.Empty>No cabins found</Table.Empty>
          ) : (
            cabins.map((c) => (
              <CabinRow
                key={c.id}
                cols="2.4fr 1.2fr 1fr 1fr 1fr 1fr"
                cabin={c}
              />
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
