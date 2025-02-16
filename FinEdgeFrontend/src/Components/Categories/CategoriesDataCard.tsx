import { CategoryResponse } from "../../Utils/Types";
import CategoryData from "./CategoryData";

const CategoriesDataCard = ({data}: {data: CategoryResponse}) => {
  return (
    <>
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-lg p-4 shadow sticky top-4">
          <div>
            <CategoryData name="Balance" value={data.balance} />
            <CategoryData name="Budget" value={data.budget} />
            <CategoryData name="Average Balance" value={data.averageBalance} />
            <CategoryData name="Average Budget" value={data.averageBudget} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesDataCard;