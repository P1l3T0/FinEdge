import { AccountStats } from "../../../../Utils/Types";
import AccountQuickStatsOverallRow from "./AccountQuickStatsCardRow";

const AccountQuickStatsOverallCard = ({ data }: { data: AccountStats }) => {
  return (
    <>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Overall</h4>
        <div>
          <AccountQuickStatsOverallRow label="Total Accounts" value={data?.totalAccounts} />
          <AccountQuickStatsOverallRow label="Total Balance" value={<>{data?.totalBalance} {data?.primaryCurrency}</>} valueClassName="text-blue-600" />
          <AccountQuickStatsOverallRow label="Average Balance" value={<>{data?.averageBalance.toFixed(2)} {data?.primaryCurrency}</> } valueClassName="text-green-600" />
        </div>
      </div>
    </>
  );
};

export default AccountQuickStatsOverallCard;