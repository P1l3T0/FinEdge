import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getTransactionReportsEndPoint } from "../endpoints";
import { Reports } from "../Utils/Types";

const useGetReports = () => {
  const getReports = async () => {
    return await axios
      .get<Reports>(`${getTransactionReportsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<Reports>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No transactions found ${err.message}`);
      });
  };

  const reportsQuery = useQuery({
    queryKey: ["reports"],
    queryFn: getReports
  })

  const { data, isLoading, isError, error } = reportsQuery;

  return { data, isLoading, isError, error }
}

export default useGetReports;