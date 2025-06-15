import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteTransactionEndPoint } from "../../Utils/endpoints";

const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  const deleteTransaction = async (transactionId: number) => {
    await axios
      .delete(`${deleteTransactionEndPoint}/${transactionId}`, { withCredentials: true })
      .catch((err: AxiosError) => {
        console.error(`Error deleting transaction: ${err.message}`);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["sankey-chart"] });
      queryClient.invalidateQueries({ queryKey: ["category-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });

  const handleDelete = async (transactionId: number) => {
    await mutateAsync(transactionId);
  };

  return { handleDelete };
};

export default useDeleteTransaction;