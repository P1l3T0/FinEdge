import { useState } from "react";
import AccountsGrid from "../Grids/AccountsGrid";
import CategoriesGrid from "../Grids/CategoriesGrid";
import TransactionsGrid from "../Grids/TransactionsGrid";
import InfoCard from "./InfoCard";
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout";
import { UserDataResponse } from "../../../Utils/Types";

const InformationGrids = ({userData}: {userData: UserDataResponse}) => {
  const [selected, setSelected] = useState<number>(0);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  return (
    <>
      <InfoCard title="Information" className="lg:col-span-2">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title="Accounts" >
            <AccountsGrid accounts={userData?.accounts!} />
          </TabStripTab>
          <TabStripTab title="Categories">
            <CategoriesGrid categories={userData?.categories!} />
          </TabStripTab>
          <TabStripTab title="Transactions">
            <TransactionsGrid transactions={userData?.transactions!} />
          </TabStripTab>
        </TabStrip>
      </InfoCard>
    </>
  );
}

export default InformationGrids;