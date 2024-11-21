import { Button } from '@progress/kendo-react-all';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { deleteTransactionEndPoint } from '../../endpoints';
import { Transaction } from '../../Utils/Types';

const DeleteTransaction = ({ transaction }: { transaction: Transaction }) => {
  const queryClient = useQueryClient();

  const deleteTransaction = async () => {
    await axios
      .delete(`${deleteTransactionEndPoint}/${transaction.id}`, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No transaction found ${err.message}`);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"], });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
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

export default DeleteTransaction