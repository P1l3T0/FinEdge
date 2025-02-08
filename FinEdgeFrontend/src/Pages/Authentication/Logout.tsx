import axios, { AxiosError } from "axios";
import { logoutEndPoint } from "../../endpoints";
import { useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Logout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOutUser = async () => {
    await axios
      .post(`${logoutEndPoint}`, {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((error: AxiosError) => {});
  };

  const { mutateAsync } = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError) => {
      alert(error.response?.data);
    },
  });

  const handleClick = async () => {
    mutateAsync();
  };

  return (
    <>
      <Button id="logout" onClick={handleClick}>
        Log out
      </Button>
    </>
  );
};

export default Logout;
