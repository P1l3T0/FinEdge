import { Chart, ChartLegend, ChartTooltip, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartSeriesItemTooltip } from "@progress/kendo-react-charts";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetCategoryChartData from "../../../Hooks/Categories/useGetCategoryChartData";

const CategoryColumnChart = () => {
  const { data, isLoading, isError, error } = useGetCategoryChartData();

  if (isLoading) return <div>Loading chart data...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <Card className="bg-white" >
        <CardHeader className="border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Balance vs Budget by Category</h3>
        </CardHeader>
        <CardBody>
          <Chart style={{ height: 435 }}>
            <ChartLegend visible={false} />
            <ChartTooltip />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem title={{ text: "Amount (BGN)" }} />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem type="column" data={data} field="balance" categoryField="name" name="Balance" gap={1}>
                <ChartSeriesItemTooltip format="Balance: {0} BGN" />
              </ChartSeriesItem>
              <ChartSeriesItem type="column" data={data} field="budget" categoryField="name" name="Budget" gap={1}>
                <ChartSeriesItemTooltip format="Budget: {0} BGN" />
              </ChartSeriesItem>
            </ChartSeries>
          </Chart>
        </CardBody>
      </Card>
    </>
  );
};

export default CategoryColumnChart;