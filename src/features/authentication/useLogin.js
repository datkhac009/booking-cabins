import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: logins,
    isLoading: isLogin,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueriesData("user", data.user);//khi đăng nhập đúng thì sẽ lưu trữ dữ liệu user ở local
      toast.success("Logged in successfully!");
      navigate("/dashboard" , {replace:true});
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
      console.log(err)
    },
  });
  return { logins, isLogin, error };
}

export default useLogin;
