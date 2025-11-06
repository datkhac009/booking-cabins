import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { apiCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  const [cabins, setCabins] = useState([]);
  useEffect(() => {
    apiCabins()
      .then((data) => setCabins(data))
      .catch((err) => console.error(err));
  }, []);

  console.log(cabins);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>
      <div>
        <CabinTable />
        {/* {cabins.length > 0 && <img src={cabins[0].image} alt="Cabin" />} */}
      </div>
    </>
  );
}

export default Cabins;
