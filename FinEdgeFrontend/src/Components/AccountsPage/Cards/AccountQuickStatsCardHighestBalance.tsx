import { AccountStats } from "../../../Utils/Types";

const AccountQuickStatsHighestBalanceCard = ({ data }: { data: AccountStats }) => {
  return (
    <>
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">
          Highest Balance Account
        </h4>
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Account</span>
              <span className="font-semibold">
                {data?.highestBalanceAccount?.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Type</span>
              <span className="font-semibold">
                {data?.highestBalanceAccount?.type}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Balance</span>
              <span className="font-bold text-blue-600">
                {data?.highestBalanceAccount?.balance}{" "}
                {data?.highestBalanceAccount?.currency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountQuickStatsHighestBalanceCard;