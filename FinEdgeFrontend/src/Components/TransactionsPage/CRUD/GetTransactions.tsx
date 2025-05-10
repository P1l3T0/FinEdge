import useGetTransactions from "../../../Hooks/Transactions/useGetTransactions";
import { filterBy, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import TransactionFilter from "./TransactionFilter";
import { useState } from "react";
import TransactionFAB from "../AIPrompt/TransactionFAB";
import { Pager, PageChangeEvent } from "@progress/kendo-react-data-tools";
import { ListView } from "@progress/kendo-react-listview";
import TransactionCard from "../Cards/TransactionCard/TransactionCard";

const GetTransactions = () => {
  const { data, isLoading, isError, error } = useGetTransactions();

  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const [page, setPage] = useState({
    skip: 0,
    take: 10,
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <TransactionFilter onFilterChange={handleFilterChange} />
      <ListView data={pagedData} item={TransactionCard} />
      <Pager className="k-listview-pager" skip={skip} take={take} onPageChange={handlePageChange} total={data?.allTransactions.length!} />

      <TransactionFAB />
    </>
  );
};

export default GetTransactions;