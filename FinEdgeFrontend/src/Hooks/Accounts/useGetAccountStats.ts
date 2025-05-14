import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getAccountStatisticsEndPoint } from "../../Utils/endpoints";
import { AccountStats } from "../../Utils/Types";

const useGetAccountStats = () => {
  const getAccountStats = async () => {
    return await axios
      .get<AccountStats>(`${getAccountStatisticsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<AccountStats>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`Failed to fetch account statistics: ${err.message}`);
      });
  };

  const statsQuery = useQuery({
    queryKey: ["accountStats"],
    queryFn: getAccountStats,
  });

  const { data } = statsQuery;

  return { data };
};

export default useGetAccountStats;