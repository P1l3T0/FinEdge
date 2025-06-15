import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteCategoryEndPoint } from "../../Utils/endpoints";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const deleteCategory = async (categoryId: number) => {
    await axios
      .delete(`${deleteCategoryEndPoint}/${categoryId}`, { withCredentials: true })
      .catch((err: AxiosError) => {
        console.error(`Error deleting category: ${err.message}`);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenditure-categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-chart-data"] });
      queryClient.invalidateQueries({ queryKey: ["category-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });

  const handleDelete = async (categoryId: number) => {
    await mutateAsync(categoryId);
  };

  return { handleDelete };
};

export default useDeleteCategory;