import { Category } from "../../../Utils/Types";

const CategoryCardBody = ({ category }: {category: Category}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Balance</span>
          <span className="text-xl font-bold">
            {category.balance} {category.currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Budget</span>
          <span className="text-xl font-bold text-green-600">
            {category.budget} {category.currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Subcategories</span>
          <span className="text-xs font-bold text-green-600">
            {category.subcategories.map((subcategory) => subcategory.name).join(", ")}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Created</span>
          <span className="text-sm text-gray-500">
            {category.dateCreated.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </>
  );
};

export default CategoryCardBody;