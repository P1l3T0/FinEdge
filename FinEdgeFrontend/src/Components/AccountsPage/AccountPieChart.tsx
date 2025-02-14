import { Card, CardHeader, CardBody, Chart, ChartTitle, ChartLegend, ChartSeries, ChartSeriesItem, ChartSeriesLabels } from "@progress/kendo-react-all";
import useGetAccountChartData from "../../Hooks/Accounts/useGetAccountChartData";

const AccountPieChart = () => {
  const { data, isLoading, isError, error } = useGetAccountChartData();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Account Distribution
          </h3>
        </CardHeader>
        <CardBody>
          <Chart>
            <ChartTitle text="Accounts by Type" />
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem type="pie" data={data} categoryField="category" field="value">
                <ChartSeriesLabels content={(e) => `${e.category} - ${e.value} BGN`} />
              </ChartSeriesItem>
              <ChartSeriesItem type="pie" name={"Empty"} visible={data!.length <= 0} data={[{ value: 1, color: "grey" }]}/>
            </ChartSeries>
          </Chart>
        </CardBody>
      </Card>
    </>
  );
};

export default AccountPieChart;
