import { Card, CardBody, CardFooter, CardHeader } from "@progress/kendo-react-layout";
import usesGetIncomeCategories from "../../../Hooks/Categories/useGetIncomeCategories";
import CategoryCardBody from "../Cards/CategoryCardBody";
import CategoryCardHeader from "../Cards/CategoryCardHeader";
import CategoryCardFooter from "../Cards/CategoryCardFooter";
import CategoriesDataCard from "../Cards/CategoriesDataCard";

const IncomeCategories = () => {
  const { data, isLoading, isError, error } = usesGetIncomeCategories();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <h2 className="text-md font-semibold text-gray-600 mb-4 mt-4">Income Categories</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.categories.map((category, index) => (
              <Card key={index} className="shadow-md hover:shadow-xl duration-300 ease-in-out">
                <CardHeader style={{ backgroundColor: `${category.color}15` }}>
                  <CategoryCardHeader category={category} />
                </CardHeader>
                <CardBody>
                  <CategoryCardBody category={category} />
                </CardBody>
                <CardFooter>
                  <CategoryCardFooter category={category} />
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

export default IncomeCategories;