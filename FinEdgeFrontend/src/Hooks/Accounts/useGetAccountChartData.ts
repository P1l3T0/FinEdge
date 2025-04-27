// hooks/useGetAccountChartData.ts
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getAccountChartDataEndPoint } from "../../Utils/endpoints";
import { AccountChartData } from "../../Utils/Types";

const useGetAccountChartData = () => {
  const getAccountChartData = async () => {
    return await axios
      .get<AccountChartData[]>(`${getAccountChartDataEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<AccountChartData[]>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`Failed to fetch account chart data: ${err.message}`);
      });
  };

  const accountsChartDataQuery = useQuery({
    queryKey: ["accountChartData"],
    queryFn: getAccountChartData,
  });

  const { data, isLoading, isError, error } = accountsChartDataQuery;

  return { data, isLoading, isError, error };
};

export default useGetAccountChartData;