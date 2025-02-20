import { Category } from "../../../Utils/Types";
import DeleteCategory from "../CRUD/DeleteCategory";
import UpdateCategory from "../CRUD/UpdateCategory";

const CategoryCardFooter = ({ category }: {category: Category}) => {
  return (
    <>
      <div className="flex justify-end gap-2">
        <UpdateCategory category={category} />
        <DeleteCategory category={category} />
      </div>
    </>
  );
};

export default CategoryCardFooter;