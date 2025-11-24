import {  useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button"
import CreateCabinFormv1 from './../features/cabins/CreateCabinFormv1';

function Cabins() {
  const [showForm,setShowForm] = useState(false)
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <div>
        <CabinTable />
        <Button onClick={ () => setShowForm((s)=>!s)} style={{width :"100%" , marginBottom:"5rem" , marginTop:"1.5rem"}}>Add new Cabin</Button>
        {showForm && <CreateCabinFormv1 closeModal={setShowForm}/>}


        {/* {cabins.length > 0 && <img src={cabins[0].image} alt="Cabin" />} */}
      </div>
    </>
  );
}

export default Cabins;
