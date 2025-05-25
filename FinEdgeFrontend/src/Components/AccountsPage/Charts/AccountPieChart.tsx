import { Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartSeriesLabels, ChartTooltip } from "@progress/kendo-react-charts";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import useGetAccountChartData from "../../../Hooks/Accounts/useGetAccountChartData";
import { Button } from "@progress/kendo-react-buttons";
import useChartExport from "../../../Hooks/Accounts/useChartExport";

const AccountPieChart = () => {
  const { data } = useGetAccountChartData();
  const { chart, onPDFExport, onSVGExport, onImageExport } = useChartExport();

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

  return (
    <>
      <Card style={{ height: "31.1rem" }}>
        <CardHeader>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Account Distribution</h2>
            <div>
              <Button className="mx-1" themeColor={'primary'} onClick={onPDFExport}>Export to PDF</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onSVGExport}>Export to SVG</Button>
              <Button className="mx-1" themeColor={'primary'} onClick={onImageExport}>Export to PNG</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Chart ref={chart}>
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