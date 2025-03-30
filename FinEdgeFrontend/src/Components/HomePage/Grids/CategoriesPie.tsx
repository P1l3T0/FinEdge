import { Chart, ChartTitle, ChartSeries, ChartSeriesItem, ChartSeriesLabels, ChartLegend, ChartTooltip } from "@progress/kendo-react-charts";
import { CategoryInfoDTO } from "../../../Utils/Types";

const CategoriesPie = ({ data, title }: { data: CategoryInfoDTO[], title: string }) => {
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
      {data && (
        <Chart>
          <ChartTitle text={title} />
          <ChartSeries>
            <ChartSeriesItem type="donut" data={data} categoryField="name" field="ammount" color="color" >
              <ChartSeriesLabels position="outsideEnd" content={labelContent} />
            </ChartSeriesItem>
          </ChartSeries>
          <ChartLegend visible={true} position="bottom" />
          <ChartTooltip render={renderTooltip} />
        </Chart>
      )}
    </>
  );
}

export default CategoriesPie;