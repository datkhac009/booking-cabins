import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "./../features/bookings/BookingTable";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">All bookings</Heading>
      </Row>
      <BookingTableOperations />
      <BookingTable />
    </>
  );
}

export default Bookings;
