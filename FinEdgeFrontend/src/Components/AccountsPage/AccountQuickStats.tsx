import { Card, CardBody, CardHeader } from "@progress/kendo-react-all";
import useGetAccountStats from "../../Hooks/Accounts/useGetAccountStats";

const QuickStats = () => {
  const { data, isLoading, isError, error } = useGetAccountStats();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <Card className="bg-white custom-scrollbar" style={{ height: "485px", overflowY: "scroll" }}>
        <CardHeader className="border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Quick Statistics
          </h3>
        </CardHeader>
        <CardBody className="p-4">
          <div className="space-y-6">
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
                    {data?.averageBalance} {data?.primaryCurrency}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">
                By Account Type
              </h4>
              {data?.accountTypeStats.map((stat) => (
                <div key={stat.type} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{stat.type}</span>
                    <span className="text-sm text-gray-500">
                      {stat.accountCount} accounts
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold">
                      {stat.totalBalance} {data?.primaryCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average</span>
                    <span className="font-semibold">
                      {stat.averageBalance} {data?.primaryCurrency}
                    </span>
                  </div>
                </div>
              ))}
            </div>

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
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default QuickStats;