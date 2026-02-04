import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "./../features/bookings/BookingTable";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">All bookings</Heading>
        <p>No bookings available at this moment.</p>
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
