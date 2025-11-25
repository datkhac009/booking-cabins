
import Spinner from "./../../ui/Spinner";
import Table from "./../../ui/Table";
import CabinRow from "../../ui/TableRow";
import { useCabins } from './useCabins';

export default function CabinTable() {
  const {isLoading, cabins } = useCabins()
  
  console.log(cabins);
  if(isLoading) return <Spinner />
  return (
    <div>
      <Table>
        <Table.Header columns="2.4fr 1.2fr 1fr 1fr 1fr 1fr ">
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
