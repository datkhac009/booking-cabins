import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBooking() {
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status") || "";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // sortBy
  const sortByValue = searchParams.get("sortBy") || "";
  let sortBy = null;
  if (sortByValue) {
    const [field, direction] = sortByValue.split("-");
    if (field && direction) sortBy = { field, direction };
  }
  //pagintion 

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: {data: bookings , count} = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy , page],
    queryFn: () => getBooking({ filter, sortBy ,page}),
  });

  return { bookings, isLoading, error ,count};
}

export default useBooking;
