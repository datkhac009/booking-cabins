import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const {  mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabins(newCabin, id),
    onSuccess: ({cabin}) => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries( ["cabins"] ,cabin);
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}

