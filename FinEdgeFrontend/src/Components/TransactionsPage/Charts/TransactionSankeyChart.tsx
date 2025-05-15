import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import { Sankey, SankeyLinkDefaults } from "@progress/kendo-react-charts";
import useGetTransactionSankeyChartData from "../../../Hooks/Transactions/useGetCategorySankeyData";
import { Button } from "@progress/kendo-react-buttons";
import useSankeyExport from "../../../Hooks/Transactions/useSankeyExport";

const TransactionSankeyChart = () => {
  const { data } = useGetTransactionSankeyChartData();
  const { sankey, onPDFExport, onSVGExport, onImageExport } = useSankeyExport();

  const links: SankeyLinkDefaults = {
    colorType: "source",
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Transaction Sankey Chart</h2>
            <div>
              <Button className="mx-2" themeColor={'primary'} onClick={onPDFExport}>Export to PDF</Button>
              <Button className="mx-2" themeColor={'primary'} onClick={onSVGExport}>Export to SVG</Button>
              <Button className="mx-2" themeColor={'primary'} onClick={onImageExport}>Export to PNG</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {data?.links.length! > 0 && data?.nodes.length! > 0 
            ? <Sankey data={data!} links={links} ref={sankey} style={{ width: "100%", height: "100%" }} />
            : ""}
        </CardBody>
      </Card>
    </>
  );
};

export default TransactionSankeyChart;