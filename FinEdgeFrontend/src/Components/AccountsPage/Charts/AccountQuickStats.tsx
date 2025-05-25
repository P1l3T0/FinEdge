import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetAccountStats from "../../../Hooks/Accounts/useGetAccountStats";
import AccountQuickStatsdAccountTypesCard from "../Cards/QuickStats/AccountQuickStatsCardAccountTypes";
import AccountQuickStatsOverallCard from "../Cards/QuickStats/AccountQuickStatsCardOverall";

const QuickStats = () => {
  const { data } = useGetAccountStats();

  return (
    <>
      <Card className="custom-scrollbar" style={{ height: "31.10rem", overflowY: "scroll" }}>
        <CardHeader>
          <h2 className="text-lg font-semibold">Quick Statistics</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <AccountQuickStatsOverallCard data={data!} />
            <AccountQuickStatsdAccountTypesCard data={data!} />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default QuickStats;