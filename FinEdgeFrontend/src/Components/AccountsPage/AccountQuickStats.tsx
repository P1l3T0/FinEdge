import { Card, CardBody, CardHeader } from "@progress/kendo-react-all";
import useGetAccountStats from "../../Hooks/Accounts/useGetAccountStats";
import AccountQuickStatsHighestBalanceCard from "./Cards/AccountQuickStatsCardHighestBalance";
import AccountQuickStatsOverallCard from "./Cards/AccountQuickStatsCardOverall";
import AccountQuickStatsdAccountTypesCard from "./Cards/AccountQuickStatsCardAccountTypes";

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