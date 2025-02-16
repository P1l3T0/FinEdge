import { Category } from "../../../Utils/Types";
import DeleteCategory from "../../../Data/Categories/DeleteCategory";
import UpdateCategory from "../../../Data/Categories/UpdateCategory";

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