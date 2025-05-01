import useDeleteCategory from "../../../Hooks/Categories/useDeleteCategory";
import { Category } from "../../../Utils/Types";
import { Button } from "@progress/kendo-react-buttons";

const DeleteCategory = ({ category }: { category: Category }) => {
  const { handleDelete } = useDeleteCategory();

  const onDeleteClick = async () => {
    await handleDelete(category.id);
  };

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'error'} onClick={onDeleteClick}>Delete</Button>
    </>
  )
}

export default DeleteCategory;