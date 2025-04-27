import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteFinancialRecommendationEndPoint } from "../../Utils/endpoints";

const useDeleteFinancialRecommendations = () => {
  const queryClient = useQueryClient();

  const deleteFinancialRecommendations = async () => {
    await axios
      .delete(deleteFinancialRecommendationEndPoint, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No recommendations found: ${err.message}`);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteFinancialRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });

  const handleDelete = async () => {
    await mutateAsync();
  };

  return { handleDelete };
};

export default useDeleteFinancialRecommendations;