import { useMutation } from "@tanstack/react-query";
import { signup as signApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUpForm() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account create sucssesfully ");
    },
  });

  return { signup, isLoading };
}

export default useSignUpForm;
