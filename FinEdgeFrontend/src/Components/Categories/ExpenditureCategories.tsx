import { Card, CardBody, CardFooter, CardHeader } from "@progress/kendo-react-layout";
import usesGetExpenditureCategories from "../../Hooks/useGetExpenditureCategories";
import DeleteCategory from "../../Data/Categories/DeleteCategory";
import UpdateCategory from "../../Data/Categories/UpdateCategory";
import CategoriesDataCard from "./CategoriesDataCard";
import CategoryCardBody from "./Cards/CategoryCardBody";
import CategoryCardHeader from "./Cards/CategoryCardHeader";

const ExpenditureCategories = () => {
  const { data, isLoading, isError, error } = usesGetExpenditureCategories();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <h2 className="text-md font-semibold text-gray-600 mb-4 mt-4">Expenditure Categories</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.categories.map((category, index) => (
              <Card key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl duration-300 ease-in-out">
                <CardHeader className="border-b border-gray-200 p-4" style={{ backgroundColor: `${category.color}15` }}>
                  <CategoryCardHeader category={category} />
                </CardHeader>
                <CardBody className="p-4">
                  <CategoryCardBody category={category} />
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