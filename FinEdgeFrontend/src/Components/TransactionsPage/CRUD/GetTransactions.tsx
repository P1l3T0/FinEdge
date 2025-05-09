import useGetTransactions from "../../../Hooks/Transactions/useGetTransactions";
import TransactionCards from "../Cards/TransactionCard/TransactionCards";
import { filterBy, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import TransactionFilter from "./TransactionFilter";
import { useState } from "react";
import TransactionFAB from "../AIPrompt/TransactionFAB";

const GetTransactions = () => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const { data, isLoading, isError, error } = useGetTransactions();

  const handleFilterChange = (newFilter: CompositeFilterDescriptor) => {
    setFilter(newFilter);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <TransactionFilter onFilterChange={handleFilterChange} />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <TransactionCards transactions={filterBy(data?.allTransactions!, filter)} />
          </div>
        </div>
      </div>

      <TransactionFAB />
    </>
  );
};

export default GetTransactions;