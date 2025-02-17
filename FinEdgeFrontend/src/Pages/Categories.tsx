import CategoriesSankeyChart from "../Components/CategoriesPage/CategoriesSankeyChart";
import ExpenditureCategories from "../Components/CategoriesPage/ExpenditureCategories";
import IncomeCategories from "../Components/CategoriesPage/IncomeCategories";
import CreateCategory from "../Data/Categories/CreateCategory";

const Categories = () => {
  return (
    <>
      <div className="p-6 bg-gray-50">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <CreateCategory />
            </div>
            <div className="lg:col-span-3">
              <CategoriesSankeyChart />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Categories</h2>
              <div>
                <ExpenditureCategories />
                <IncomeCategories />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
