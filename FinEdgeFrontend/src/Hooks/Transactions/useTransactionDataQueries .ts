import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { getAccountAndCategoryNamesEnddPoint, getTransactionEndPoint, getTransactionReportsEndPoint, getTransactionSankeyChartDataEndPoint } from "../../Utils/endpoints";
import { TransactionResponse } from "../../Utils/Types";

export const useTransactionDataQueries = () => {
  const results = useQueries({
    queries: [{
        queryKey: ["transactions"],
        queryFn: async () => {
          const res = await axios.get<TransactionResponse>(getTransactionEndPoint, { withCredentials: true });
          const data = res.data;

          return {
            ...data,
            allTransactions: data.allTransactions.map((tx) => ({
              ...tx,
              dateCreated: new Date(tx.dateCreated),
            })),
            expenditureTransactions: data.expenditureTransactions.map((tx) => ({
              ...tx,
              dateCreated: new Date(tx.dateCreated),
            })),
            incomeTransactions: data.incomeTransactions.map((tx) => ({
              ...tx,
              dateCreated: new Date(tx.dateCreated),
            })),
          };
        },
      }, {
        queryKey: ["reports"],
        queryFn: async () => {
          const res = await axios.get(getTransactionReportsEndPoint, { withCredentials: true });
          return res.data;
        },
      }, {
        queryKey: ["sankey-chart"],
        queryFn: async () => {
          const res = await axios.get(getTransactionSankeyChartDataEndPoint, { withCredentials: true });
          return res.data;
        },
      }, {
        queryKey: ["names"],
        queryFn: async () => {
          const res = await axios.get(getAccountAndCategoryNamesEnddPoint, { withCredentials: true });
          return res.data;
        },
      },
    ],
  });

  const isLoading = results.some((q) => q.isLoading);
  const isError = results.some((q) => q.isError);
  const error = results.find((q) => q.isError)?.error as Error | undefined;

  return { isLoading, isError, error };
};
