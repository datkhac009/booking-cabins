import { useMutation } from "@tanstack/react-query";
import { signup as signApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUpForm() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signApi,
    onSuccess: () => {
      toast.success("Account created successfully! You can log in now.");
    },
    onError: (err) => {
      toast.error(err.message || "Could not create account");
    },
  });

  return { signup, isLoading };
}

export default useSignUpForm;
