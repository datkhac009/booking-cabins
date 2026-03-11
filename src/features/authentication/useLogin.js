import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: logins,
    isLoading: isLogin,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => login({email, password}),
    onSuccess: () => {
      toast.success("Logged in successfully!");
      navigate("/dashboard"); 
    },
    onError: () => {
      toast.error("There was an error checking in");
    },
  });
  return { logins, isLogin, error };
}

export default useLogin;
