import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteAccountEndPoint } from "../../Utils/endpoints";

const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const deleteAccount = async (accountId: number) => {
    await axios
      .delete(`${deleteAccountEndPoint}/${accountId}`, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No accounts found: ${err.message}`);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accountChartData"] });
      queryClient.invalidateQueries({ queryKey: ["accountStats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["category-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });

  const handleDelete = async (accountId: number) => {
    await mutateAsync(accountId);
  };

  return { handleDelete };
};

export default useDeleteAccount;