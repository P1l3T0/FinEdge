import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getTransactionSankeyChartDataEndPoint } from "../../Utils/endpoints";
import { SankeyData } from "@progress/kendo-react-charts";

const useGetTransactionSankeyChartData = () => {
  const getSankeyChartData = async () => {
    return await axios
      .get<SankeyData>(`${getTransactionSankeyChartDataEndPoint}`, { withCredentials: true, })
      .then((res: AxiosResponse<SankeyData>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`Failed to fetch Sankey chart data: ${err.message}`);
      });
  };

  const sankeyChartQuery = useQuery({
    queryKey: ["sankey-chart"],
    queryFn: getSankeyChartData,
  });

  const { data } = sankeyChartQuery;

  return { data };
};

export default useGetTransactionSankeyChartData;