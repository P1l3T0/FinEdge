import { Button } from "@progress/kendo-react-all";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteCategoryEndPoint } from "../../endpoints";
import { Category } from "../../Utils/Types";

const DeleteCategory = ({ category }: { category: Category }) => {
  const queryClient = useQueryClient();

  const deleteCategory = async () => {
    await axios
      .delete(`${deleteCategoryEndPoint}/${category.id}`, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No category found ${err.message}`);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenditure-category"], });
      queryClient.invalidateQueries({ queryKey: ["income-category"] });
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

export default DeleteCategory;