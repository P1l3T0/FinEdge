import { AccountStats } from "../../../../Utils/Types";

const AccountQuickStatsOverallCard = ({ data }: { data: AccountStats }) => {
  return (
    <>
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Overall</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Balance</span>
            <span className="text-xl font-bold text-blue-600">
              {data?.totalBalance} {data?.primaryCurrency}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Accounts</span>
            <span className="text-xl font-bold">{data?.totalAccounts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average Balance</span>
            <span className="text-xl font-bold text-green-600">
              {data?.averageBalance.toFixed(2)} {data?.primaryCurrency}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountQuickStatsOverallCard;