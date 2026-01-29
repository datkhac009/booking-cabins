import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";


function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation />
      </Row>
      <div>
        <CabinTable />
        <AddCabin />
        {/* {cabins.length > 0 && <img src={cabins[0].image} alt="Cabin" />} */}
      </div>
    </>
  );
}

export default Cabins;
