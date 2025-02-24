import { Card, CardHeader, CardBody, Chart, ChartTooltip, ChartCategoryAxis, ChartCategoryAxisItem, ChartSeries, ChartSeriesItem, ChartSeriesItemTooltip } from "@progress/kendo-react-all";
import useGetCategoryChartData from "../../../Hooks/Categories/useGetCategoryChartData";

const CategoryBarChart = () => {
  const { data, isLoading, isError, error } = useGetCategoryChartData();

  if (isLoading) return <div>Loading chart data...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Category Distribution</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Top Categories by Balance</h4>
              <Chart style={{ height: 200 }}>
                <ChartTooltip  />
                <ChartCategoryAxis>
                  <ChartCategoryAxisItem />
                </ChartCategoryAxis>
                <ChartSeries>
                  <ChartSeriesItem type="bar" field="balance" categoryField="name" color="color" data={data}>
                    <ChartSeriesItemTooltip format="Balance: {0} BGN" />
                  </ChartSeriesItem>
                </ChartSeries>
              </Chart>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CategoryBarChart;
