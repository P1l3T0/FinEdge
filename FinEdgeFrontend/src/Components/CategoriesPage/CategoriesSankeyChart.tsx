import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import { Sankey, SankeyLinkDefaults } from "@progress/kendo-react-charts";
import useGetSankeyChartData from "../../Hooks/Categories/useGetCategorySankeyData";

const CategoriesSankeyChart = () => {
  const { data, isLoading, isError, error } = useGetSankeyChartData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error!.message}</div>;

  const links: SankeyLinkDefaults = {
    colorType: "source",
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Budget Flow Visualization</h2>
        </CardHeader>
        <CardBody>
          {data?.links.length! > 0 && data?.nodes.length! > 0 
            ? <Sankey data={data!} links={links} style={{ width: "100%", height: "100%" }} />
            : ""}
        </CardBody>
      </Card>
    </>
  );
};

export default CategoriesSankeyChart;