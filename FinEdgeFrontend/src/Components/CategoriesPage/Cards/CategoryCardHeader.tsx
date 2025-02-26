import { Category } from "../../../Utils/Types";

const CategoryCardHeader = ({ category }: { category: Category }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{category.isIncome ? "Income" : "Expense"} Category</span>
        </div>
        <div className="h-10 w-10 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: category.color, boxShadow: `0 4px 6px ${category.color}40` }}>
          <span className="font-bold text-white">{category.name.charAt(0).toUpperCase()}</span>
        </div>
      </div>
    </>
  );
};

export default CategoryCardHeader;
