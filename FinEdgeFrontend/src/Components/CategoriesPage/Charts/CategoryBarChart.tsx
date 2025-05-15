import { Chart, ChartCategoryAxis, ChartCategoryAxisItem, ChartSeries, ChartSeriesItem, ChartSeriesItemTooltip } from "@progress/kendo-react-charts";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetCategoryChartData from "../../../Hooks/Categories/useGetCategoryChartData";
import { Button } from "@progress/kendo-react-buttons";
import useChartExport from "../../../Hooks/Accounts/useChartExport";

const CategoryBarChart = () => {
  const { data } = useGetCategoryChartData();
  const { chart, onPDFExport, onSVGExport, onImageExport } = useChartExport();

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="border-b border-gray-200 mb-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Top Categories by Balance</h2>
            <div>
              <Button className="mx-1" themeColor={'primary'} onClick={onPDFExport}>Export to PDF</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onSVGExport}>Export to SVG</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onImageExport}>Export to PNG</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-8">
            <div>
              <Chart style={{ height: 200 }} ref={chart}>
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
