import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { logoutEndPoint } from "../endpoints";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOutUser = async () => {
    await axios
      .post(`${logoutEndPoint}`, {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((error: AxiosError) => {
        throw error;
      });
  };

  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError) => {
      alert(error.response?.data);
    },
  });
};

export default useLogout;
