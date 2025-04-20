import { useState } from "react";
import useGetUser from "../../../Hooks/Auth/useGetUser";
import AccountsGrid from "../Grids/AccountsGrid";
import CategoriesGrid from "../Grids/CategoriesGrid";
import TransactionsGrid from "../Grids/TransactionsGrid";
import InfoCard from "./InfoCard";
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout";

const InformationGrids = () => {
  const { data, isLoading, isError, error } = useGetUser();

  const [selected, setSelected] = useState<number>(0);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <InfoCard title="Information" className="lg:col-span-2">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title="Categories">
            <CategoriesGrid categories={data?.categories!} />
          </TabStripTab>
          <TabStripTab title="Accounts" >
            <AccountsGrid accounts={data?.accounts!} />
          </TabStripTab>
          <TabStripTab title="Transactions">
            <TransactionsGrid transactions={data?.transactions!} />
          </TabStripTab>
        </TabStrip>
      </InfoCard>
    </>
  );
}

export default InformationGrids;