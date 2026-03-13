import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    error,
    isLoading,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      queryClient.removeQueries("user", data);//xóa data được lưu trữ ở local 
      toast.success("Logout sucsses");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error Logout");
    },
  });
  return { logout, isLoading, error };
}

export default useLogout;
