import ExpenditureCategories from "../Components/CategoriesPage/CRUD/ExpenditureCategories";
import IncomeCategories from "../Components/CategoriesPage/CRUD/IncomeCategories";
import CreateCategory from "../Components/CategoriesPage/CRUD/CreateCategory";
import CategoryBarChart from "../Components/CategoriesPage/Charts/CategoryBarChart";
import CategoryColumnChart from "../Components/CategoriesPage/Charts/CategoryColumnChart";
import CategoryFAB from "../Components/CategoriesPage/AIPrompt/CategoryFAB";
import { useCategoryDataQueries } from "../Hooks/Categories/useCategoryDataQueries";
import { Loader } from "@progress/kendo-react-indicators";

const Categories = () => {
  const { isLoading, isError, error } = useCategoryDataQueries();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <Loader type="converging-spinner" size="large" />
      </div>
    );
  }

  if (isError) console.log(error?.message);

  return (
    <>
      <div className="p-3 bg-gray-50">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div>
              <CreateCategory />
            </div>
            <div className="lg:col-span-3">
              <CategoryColumnChart />
            </div>
          </div>
          <div>
            <CategoryBarChart />
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-2">
              <ExpenditureCategories />
              <IncomeCategories />
            </div>
          </div>
        </div>
        <CategoryFAB />
      </div>
    </>
  );
};

export default Categories;