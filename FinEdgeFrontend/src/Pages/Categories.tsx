import ExpenditureCategories from "../Components/Categories/ExpenditureCategories";
import IncomeCategories from "../Components/Categories/IncomeCategories";
import CreateCategory from "../Data/Categories/CreateCategory";

const Categories = () => {
  return (
    <>
      <div className="p-6 bg-gray-50">
        <div className="space-y-6">
          <div className="gap-4 grid lg:grid-cols-3 md:grid-cols-1">
            <CreateCategory />
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                My Categfories
              </h2>
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
