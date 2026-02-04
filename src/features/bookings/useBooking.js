import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

function useBooking() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBooking,
  });
  return { bookings, isLoading, error };
}

export default useBooking;
