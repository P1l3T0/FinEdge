import { Chart, ChartLegend, ChartTooltip, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartSeriesItemTooltip } from "@progress/kendo-react-charts";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetCategoryChartData from "../../../Hooks/Categories/useGetCategoryChartData";
import { Button } from "@progress/kendo-react-buttons";
import useChartExport from "../../../Hooks/Accounts/useChartExport";

const CategoryColumnChart = () => {
  const month = new Date().toLocaleString('default', { month: 'long' });
  const { data } = useGetCategoryChartData();
  const { chart, onPDFExport, onSVGExport, onImageExport } = useChartExport();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Cactegory Distribution - {month}</h2>
            <div>
              <Button className="mx-1" themeColor={'primary'} onClick={onPDFExport}>Export to PDF</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onSVGExport}>Export to SVG</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onImageExport}>Export to PNG</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Chart pannable={true}  zoomable={true} style={{ height: 450 }} ref={chart}>
            <ChartLegend visible={false} />
            <ChartTooltip />
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