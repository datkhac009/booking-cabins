import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateEditCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabins(newCabin, id),
    onSuccess: (variables) => {
    const { id } = variables || {};
      console.log(id)
      if (id) {
        toast.success("Edit cabin successfully ");
      } else {
        toast.success("New cabin successfully created");
      }
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
