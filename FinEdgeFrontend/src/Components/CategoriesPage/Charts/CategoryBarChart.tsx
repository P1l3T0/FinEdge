import { Chart, ChartSeries, ChartSeriesItem, ChartSeriesItemTooltip, ChartTooltip } from "@progress/kendo-react-charts";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetCategoryChartData from "../../../Hooks/Categories/useGetCategoryChartData";
import { Button } from "@progress/kendo-react-buttons";
import useChartExport from "../../../Hooks/Accounts/useChartExport";

const CategoryBarChart = () => {
  const month = new Date().toLocaleString('default', { month: 'long' });
  const { data } = useGetCategoryChartData();
  const { chart, onPDFExport, onSVGExport, onImageExport } = useChartExport();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Top Categories by Balance - {month}</h2>
            <div>
              <Button className="mx-1" themeColor={'primary'} onClick={onPDFExport}>Export to PDF</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onSVGExport}>Export to SVG</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onImageExport}>Export to PNG</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Chart pannable={true} zoomable={true} ref={chart}>
            <ChartTooltip />
            <ChartSeries>
              <ChartSeriesItem type="bar" field="balance" categoryField="name" color="color" data={data}>
                <ChartSeriesItemTooltip format="Balance: {0} BGN" />
              </ChartSeriesItem>
            </ChartSeries>
          </Chart>
        </CardBody>
      </Card>
    </>
  );
};

export default CategoryBarChart;
