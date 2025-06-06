import useGetTransactions from "../../../Hooks/Transactions/useGetTransactions";
import { filterBy, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import TransactionFilter from "./TransactionFilter";
import { useState } from "react";
import { Pager, PageChangeEvent } from "@progress/kendo-react-data-tools";
import { ListView } from "@progress/kendo-react-listview";
import TransactionCard from "../Cards/TransactionCard/TransactionCard";

const GetTransactions = () => {
  const { data } = useGetTransactions();

  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const [page, setPage] = useState({
    skip: 0,
    take: 5,
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

  const filteredData = filterBy(data?.allTransactions || [], filter);
  const pagedData = filteredData.slice(skip, skip + take);

  return (
    <>
      <TransactionFilter onFilterChange={handleFilterChange} />
      <div className="flex justify-between">
        <ListView data={pagedData} item={TransactionCard} />
      </div>
      <Pager className="k-listview-pager" skip={skip} take={take} onPageChange={handlePageChange} total={data?.allTransactions.length!} />
    </>
  );
};

export default GetTransactions;