import { Button } from '@progress/kendo-react-all';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { deketeCurrentUserEnddPoint, logoutEndPoint } from "../../../Utils/endpoints";
import { useNavigate } from "react-router-dom";

const DeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteUser = async () => {
    await axios
      .delete(`${deketeCurrentUserEnddPoint}`, { withCredentials: true })
      .catch((err: AxiosError) => {});
  };

  const logOutUser = async () => {
    await axios
      .post(`${logoutEndPoint}`, {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((err: AxiosError) => {});
  };

  const deleteCurrentUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const logOut = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleDelete = async () => {
    logOut.mutateAsync();
    deleteCurrentUser.mutateAsync();
  };

  return (
    <>
      <Button
        type="button"
        fillMode="solid"
        themeColor={"error"}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteUser;