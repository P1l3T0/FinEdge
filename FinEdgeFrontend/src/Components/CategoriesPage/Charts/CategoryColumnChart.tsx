import { Chart, ChartLegend, ChartTooltip, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartSeriesItemTooltip } from "@progress/kendo-react-charts";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetCategoryChartData from "../../../Hooks/Categories/useGetCategoryChartData";
import { Button } from "@progress/kendo-react-buttons";
import useChartExport from "../../../Hooks/Accounts/useChartExport";

const CategoryColumnChart = () => {
  const { data, isLoading, isError, error } = useGetCategoryChartData();
  const { chart, onPDFExport, onSVGExport, onImageExport } = useChartExport();

  if (isLoading) return <div>Loading chart data...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <Card className="bg-white" >
        <CardHeader className="border-b border-gray-200 mb-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Account Distribution</h2>
            <div>
              <Button className="mx-1" onClick={onPDFExport}>Export to PDF</Button>
              <Button className="mx-1" onClick={onSVGExport}>Export to SVG</Button>
              <Button className="mx-1" onClick={onImageExport}>Export to PNG</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Chart style={{ height: 435 }} ref={chart}>
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