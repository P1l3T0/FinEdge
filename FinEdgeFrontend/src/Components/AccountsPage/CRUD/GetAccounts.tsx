import { useState } from "react";
import useGetAccounts from "../../../Hooks/Accounts/useGetAccounts";
import AccountFilter from "./AccountFilter";
import {CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";
import AccountCards from "../Cards/AccountCards";

const GetAccounts = () => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const { data, isLoading, isError, error } = useGetAccounts();

  const handleFilterChange = (newFilter: CompositeFilterDescriptor) => {
    setFilter(newFilter);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <AccountFilter onFilterChange={handleFilterChange} /> <br />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <AccountCards accounts={filterBy(data!, filter)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAccounts;