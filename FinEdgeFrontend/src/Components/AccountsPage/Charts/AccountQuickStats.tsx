import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetAccountStats from "../../../Hooks/Accounts/useGetAccountStats";
import AccountQuickStatsdAccountTypesCard from "../Cards/QuickStats/AccountQuickStatsCardAccountTypes";
import AccountQuickStatsHighestBalanceCard from "../Cards/QuickStats/AccountQuickStatsCardHighestBalance";
import AccountQuickStatsOverallCard from "../Cards/QuickStats/AccountQuickStatsCardOverall";

const QuickStats = () => {
  const { data, isLoading, isError, error } = useGetAccountStats();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <Card className="custom-scrollbar" style={{ height: "500px", overflowY: "scroll" }}>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Quick Statistics</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <AccountQuickStatsOverallCard data={data!} />
            <AccountQuickStatsdAccountTypesCard data={data!} />
            <AccountQuickStatsHighestBalanceCard data={data!} />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default QuickStats;