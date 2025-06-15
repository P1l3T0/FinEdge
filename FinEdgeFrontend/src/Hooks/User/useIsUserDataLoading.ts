import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { getTransactionReportsEndPoint, getCategoryInfoEndPoint, getDataForCurrentUserEnddPoint, getCurrentUserEnddPoint } from "../../Utils/endpoints";
import { Reports, CategoryInfo, UserDataResponse, User } from "../../Utils/Types";

export const useUserDataQueries = () => {
  const results = useQueries({
    queries: [{
        queryKey: ["reports"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        queryFn: async () => {
          const res = await axios.get<Reports>(getTransactionReportsEndPoint, { withCredentials: true });
          return res.data;
        },
      }, {
        queryKey: ["category-info"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        queryFn: async () => {
          const res = await axios.get<CategoryInfo>(getCategoryInfoEndPoint, { withCredentials: true });
          return res.data;
        },
      }, {
        queryKey: ["user-data"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        queryFn: async () => {
          const res = await axios.get<UserDataResponse>(getDataForCurrentUserEnddPoint, { withCredentials: true });
          return res.data;
        },
      }, {
        queryKey: ["user"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        queryFn: async () => {
          const res = await axios.get<User>(getCurrentUserEnddPoint, { withCredentials: true });
          return {
            ...res.data,
            dateCreated: new Date(res.data.dateCreated),
          };
        },
        enabled: !!document.cookie.includes("RefreshToken"),
      },
    ],
  });

  const isLoading = results.some((q) => q.isLoading);
  const isError = results.some((q) => q.isError);
  const error = results.find((q) => q.isError)?.error as Error | undefined;

  const reports = results[0]?.data as Reports | undefined;
  const categoryInfo = results[1]?.data as CategoryInfo | undefined;
  const userData = results[2]?.data as UserDataResponse | undefined;
  const user = results[3]?.data as User | undefined;

  const refetchReports = results[0]?.refetch;
  const refetchCategoryInfo = results[1]?.refetch;
  const refetchUserData = results[2]?.refetch;
  const refetchUser = results[3]?.refetch;

  return { isLoading, isError, error, reports, categoryInfo, userData, user, refetchReports, refetchCategoryInfo, refetchUserData, refetchUser };
};
