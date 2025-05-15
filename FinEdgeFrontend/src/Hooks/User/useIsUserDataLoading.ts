// hooks/useUserDataQueries.ts
import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { getTransactionReportsEndPoint, getCategoryInfoEndPoint } from "../../Utils/endpoints";
import { Reports, CategoryInfo } from "../../Utils/Types";

export const useUserDataQueries = () => {
  const results = useQueries({
    queries: [{
        queryKey: ["reports"],
        queryFn: async () => {
          const res = await axios.get<Reports>(getTransactionReportsEndPoint, {
            withCredentials: true,
          });
          return res.data;
        },
      }, {
        queryKey: ["category-info"],
        queryFn: async () => {
          const res = await axios.get<CategoryInfo>(getCategoryInfoEndPoint, {
            withCredentials: true,
          });
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
