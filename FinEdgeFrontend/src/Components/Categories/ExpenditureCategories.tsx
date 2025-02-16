import { Card, CardBody, CardFooter, CardHeader } from "@progress/kendo-react-layout";
import usesGetExpenditureCategories from "../../Hooks/useGetExpenditureCategories";
import DeleteCategory from "../../Data/Categories/DeleteCategory";
import UpdateCategory from "../../Data/Categories/UpdateCategory";
import CategoriesDataCard from "./CategoriesDataCard";

const ExpenditureCategories = () => {
  const { data, isLoading, isError, error } = usesGetExpenditureCategories();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <h2 className="text-md font-semibold text-gray-600 mb-4 mt-4">Expenditure Categories</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.categories.map((category, index) => (
              <Card key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl duration-300 ease-in-out">
                <CardHeader className="border-b border-gray-200 p-4" style={{ backgroundColor: `${category.color}15` }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Expense Category</span>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: category.color, boxShadow: `0 4px 6px ${category.color}40` }}>
                      <span className="font-bold text-white">{category.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Balance</span>
                      <span className="text-xl font-bold">
                        {category.balance} {category.currency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Budget</span>
                      <span className="text-xl font-bold text-green-600">
                        {category.budget} {category.currency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Created</span>
                      <span className="text-sm text-gray-500">
                        {new Date(category.dateCreated).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                      </span>
                    </div>
                  </div>
                </CardBody>

                <CardFooter className="border-t border-gray-200 p-4">
                  <div className="flex justify-end gap-2">
                    <UpdateCategory category={category} />
                    <DeleteCategory category={category} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <CategoriesDataCard data={data!} />
      </div>
    </>
  );
};

export default ExpenditureCategories;