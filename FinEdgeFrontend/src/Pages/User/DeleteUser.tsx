import { Button } from '@progress/kendo-react-all';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { deketeCurrentUserEnddPoint } from '../../endpoints';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteUser = async () => {
    await axios
      .delete(`${deketeCurrentUserEnddPoint}`, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((err: AxiosError) => {
        throw new Error(`No user found ${err.message}`);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleDelete = async () => {
    mutateAsync();
  }

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'error'} onClick={handleDelete}>Delete</Button>
    </>
  )
}

export default DeleteUser;