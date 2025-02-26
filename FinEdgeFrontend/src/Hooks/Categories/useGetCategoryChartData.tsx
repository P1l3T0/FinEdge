import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getCategoryChartDataEndPoint } from "../../endpoints";
import { CategoryChartData } from "../../Utils/Types";

const useGetCategoryChartData = () => {
  const getCategoryChartData = async () => {
    return await axios
      .get<CategoryChartData[]>(`${getCategoryChartDataEndPoint}`, {
        withCredentials: true,
      })
      .then((res: AxiosResponse<CategoryChartData[]>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`Failed to fetch category chart data: ${err.message}`);
      });
  };

  const categoryChartQuery = useQuery({
    queryKey: ["category-chart-data"],
    queryFn: getCategoryChartData,
  });

  const { data, isLoading, isError, error } = categoryChartQuery;

  return { data, isLoading, isError, error };
};

export default useGetCategoryChartData;