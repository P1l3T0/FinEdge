// hooks/useAccountDataQueries.ts
import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { getAllAccountsEndPoint, getAccountStatisticsEndPoint, getAccountChartDataEndPoint } from "../../Utils/endpoints";

export const useAccountDataQueries = () => {
  const results = useQueries({
    queries: [{
        queryKey: ["accounts"],
        queryFn: async () => {
          const res = await axios.get(getAllAccountsEndPoint, { withCredentials: true });
          return res.data.map((account: any) => ({
            ...account,
            dateCreated: new Date(account.dateCreated),
          }));
        },
      }, {
        queryKey: ["accountStats"],
        queryFn: async () => {
          const res = await axios.get(getAccountStatisticsEndPoint, { withCredentials: true });
          return res.data;
        },
      }, {
        queryKey: ["accountChartData"],
        queryFn: async () => {
          const res = await axios.get(getAccountChartDataEndPoint, { withCredentials: true });
          return res.data;
        },
      },
    ],
  });

  const isLoading = results.some((q) => q.isLoading);
  const isError = results.some((q) => q.isError);
  const error = results.find((q) => q.isError)?.error as Error;

  return { isLoading, isError, error }
};
