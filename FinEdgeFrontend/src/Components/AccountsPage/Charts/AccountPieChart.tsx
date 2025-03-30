import { Chart, ChartTitle, ChartLegend, ChartSeries, ChartSeriesItem, ChartSeriesLabels, ChartTooltip } from "@progress/kendo-react-charts";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetAccountChartData from "../../../Hooks/Accounts/useGetAccountChartData";

const AccountPieChart = () => {
  const { data, isLoading, isError, error } = useGetAccountChartData();

  const labelContent = (e: any) => `${e.category}: ${e.value} BGN`;

  const renderTooltip = (context: any) => {
    const { category, percentage } = context.point || context;
    const formattedPercentage: number = Number((percentage * 100).toFixed(2));

    return (
      <div>
        {category} : {formattedPercentage}%
      </div>
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <Card className="bg-white" style={{ height: "31.25rem" }}>
        <CardHeader className="border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Account Distribution</h3>
        </CardHeader>
        <CardBody>
          <Chart>
            <ChartTitle text="Accounts by Type" />
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem type="pie" data={data} categoryField="category" field="value">
                <ChartSeriesLabels content={labelContent} />
              </ChartSeriesItem>
              <ChartSeriesItem type="pie" name={"Empty"} visible={data!.length <= 0} data={[{ value: 1, color: "grey" }]}/>
            </ChartSeries>
              <ChartTooltip render={renderTooltip} />
          </Chart>
        </CardBody>
      </Card>
    </>
  );
};

export default AccountPieChart;