import { useState } from "react";
import useGetAccounts from "../../../Hooks/Accounts/useGetAccounts";
import AccountFilter from "./AccountFilter";
import {CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";
import { PageChangeEvent, Pager } from "@progress/kendo-react-data-tools";
import { ListView } from "@progress/kendo-react-listview";
import AccountCard from "../Cards/AccountCard";

const GetAccounts = () => {
  const [filter, setFilter] = useState<CompositeFilterDescriptor>({
    logic: "and",
    filters: [],
  });

  const { data } = useGetAccounts();

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

  const filteredData = filterBy(data || [], filter);
  const pagedData = filteredData.slice(skip, skip + take);

  return (
    <>
      <AccountFilter onFilterChange={handleFilterChange} /> <br />
      <div className="flex justify-between">
        <ListView data={pagedData} item={AccountCard} />
      </div>
      <Pager className="k-listview-pager" skip={skip} take={take} onPageChange={handlePageChange} total={data?.length!} />
    </>
  );
};

export default GetAccounts;