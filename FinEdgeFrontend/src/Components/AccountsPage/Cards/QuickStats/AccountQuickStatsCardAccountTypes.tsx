import { AccountStats } from "../../../../Utils/Types";
import AccountQucikStatsAccountTypeRow from "./AccountQucikStatsAccountTypeRow";

const AccountQuickStatsdAccountTypesCard = ({ data }: { data: AccountStats }) => {
  return (
    <>
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">By Account Type</h4>
        {data?.accountTypeStats.map((stat) => (
          <div key={stat.type} className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{stat.type}</span>
              <span className="text-sm text-gray-500">{stat.accountCount}{" "}{stat.accountCount === 1 ? "account" : "accounts"}</span>
            </div>
            <AccountQucikStatsAccountTypeRow label="Total" value={`${stat.totalBalance} ${data?.primaryCurrency}`} />
            <AccountQucikStatsAccountTypeRow label="Average" value={`${stat.averageBalance} ${data?.primaryCurrency}`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AccountQuickStatsdAccountTypesCard;