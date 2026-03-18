import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

 function useUpdateUser() {
  const queryClient = useQueryClient();

  const {  mutate: updateUser, isLoading: isUpdateting } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User Account successfully update");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdateting };
}

export default useUpdateUser;

