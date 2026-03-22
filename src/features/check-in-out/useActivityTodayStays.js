import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useActivityTodayStays() {
  const { isLoading, data: stays } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["todayActivity"],
  });

  return { isLoading, stays };
}

export default useActivityTodayStays;