import { Chart, ChartTitle, ChartLegend, ChartSeries, ChartSeriesItem, ChartSeriesLabels } from "@progress/kendo-react-all";
import { CategoryInfoDTO, LabelContentProps } from "../../../Utils/Types";

const CategoriesPie = ({ data, title }: { data: CategoryInfoDTO[], title: string }) => {
  const labelContent = (props: LabelContentProps) => {
    const formatedNumber = parseFloat((props.percentage * 100).toPrecision(4))
    return `${props.dataItem.name} : ${formatedNumber} %`;
  };

  return (
    <>
      {data && (
        <Chart>
          <ChartTitle text={title} />
          <ChartLegend position="bottom" />
          <ChartSeries>
            <ChartSeriesItem type="donut" data={data} categoryField="name" field="ammount" colorField="color">
              <ChartSeriesLabels position="outsideEnd" content={labelContent} />
            </ChartSeriesItem>
          </ChartSeries>
        </Chart>
      )}
    </>
  )
}

export default CategoriesPie;