import useGetIncomeCategories from "../../../Hooks/Categories/useGetIncomeCategories";
import CategoriesDataCard from "../Cards/CategoriesDataCard";
import CategoryFilter from "./CategoryFilter";
import CategoryCards from "../Cards/CategoryCards";
import { CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";
import { useState } from "react";

const IncomeCategories = () => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const { data, isLoading, isError, error } = useGetIncomeCategories();

  const handleFilterChange = (newFilter: CompositeFilterDescriptor) => {
    setFilter(newFilter);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <h2 className="text-md font-semibold text-gray-600 mb-4 mt-4">Income Categories</h2>
      <CategoryFilter onFilterChange={handleFilterChange} />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCards categories={filterBy(data?.categories!, filter)} />
          </div>
        </div>
        <CategoriesDataCard data={data!} />
      </div>
    </>
  );
};

export default IncomeCategories;
