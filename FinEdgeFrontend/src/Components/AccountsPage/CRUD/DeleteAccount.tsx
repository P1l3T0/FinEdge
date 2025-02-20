import { Button } from '@progress/kendo-react-all';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { deleteAccountEndPoint } from '../../../endpoints';
import { Account } from '../../../Utils/Types';

const DeleteAccount = ({ account }: { account: Account }) => {
  const queryClient = useQueryClient();

  const deleteAccount = async () => {
    await axios
      .delete(`${deleteAccountEndPoint}/${account.id}`, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No accounts found ${err.message}`);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accountChartData"] });
      queryClient.invalidateQueries({ queryKey: ["accountStats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
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

export default DeleteAccount;