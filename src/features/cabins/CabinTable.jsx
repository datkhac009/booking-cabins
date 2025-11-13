import { useQuery } from "@tanstack/react-query";
import { apiCabins } from "../../services/apiCabins";
import Spinner from "./../../ui/Spinner";
import Table from "./../../ui/Table";
import CabinRow from "../../ui/TableRow";
import { Toaster } from "react-hot-toast";

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
