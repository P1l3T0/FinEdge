import { useState } from "react";
import { CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";
import { PageChangeEvent, Pager } from "@progress/kendo-react-data-tools";
import { ListView } from "@progress/kendo-react-listview";
import CategoryCard from "../Cards/CategoryCard";
import CategoriesDataCard from "../Cards/CategoriesDataCard";
import CategoryFilter from "./CategoryFilter";
import { CategoryResponse } from "../../../Utils/Types";

type CategoriesListProps = {
  title: string;
  data: CategoryResponse;
}

const CategoriesList = ({ title, data }: CategoriesListProps) => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const [page, setPage] = useState({
    skip: 0,
    take: 4,
  });

  const handleFilterChange = (newFilter: CompositeFilterDescriptor) => {
    setFilter(newFilter);
  };

  const handlePageChange = (e: PageChangeEvent) => {
    setPage({
      skip: e.skip,
      take: e.take,
    });
  };

  const { skip, take } = page;

  const filteredData = filterBy(data?.categories || [], filter);
  const pagedData = filteredData.slice(skip, skip + take);

  return (
    <>
      <h2 className="text-md font-semibold text-gray-600 mb-4 mt-4">{title}</h2>
      <CategoryFilter onFilterChange={handleFilterChange} />

      <div className="flex lg:flex-row flex-col justify-between">
        <ListView data={pagedData} item={CategoryCard} />
        <CategoriesDataCard data={data!} />
      </div>

      <Pager className="k-listview-pager" skip={skip} take={take} onPageChange={handlePageChange} total={data?.categories.length!} />
    </>
  );
};

export default CategoriesList;