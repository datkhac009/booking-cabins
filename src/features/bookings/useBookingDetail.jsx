import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/apiBookings";

function useBookingDetail() {
  const { bookingId } = useParams();

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId),
    retry:false
  });

  return { booking, isLoading, error };
}

export default useBookingDetail;