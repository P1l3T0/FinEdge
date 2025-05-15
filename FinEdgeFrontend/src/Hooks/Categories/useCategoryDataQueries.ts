import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import {   getCategoryChartDataEndPoint, getExpenditureCategoriesEndPoint, getIncomeCategoriesEndPoint } from "../../Utils/endpoints";
import { CategoryChartData, CategoryResponse } from "../../Utils/Types";

export const useCategoryDataQueries = () => {
  const results = useQueries({
    queries: [{
        queryKey: ["category-chart-data"],
        queryFn: async () => {
          const res = await axios.get<CategoryChartData[]>(getCategoryChartDataEndPoint, { withCredentials: true });
          return res.data;
        },
      }, {
        queryKey: ["expenditure-categories"],
        queryFn: async () => {
          const res = await axios.get<CategoryResponse>(getExpenditureCategoriesEndPoint, { withCredentials: true });
          return {
            ...res.data,
            categories: res.data.categories.map((cat) => ({
              ...cat,
              dateCreated: new Date(cat.dateCreated),
            })),
          };
        },
      }, {
        queryKey: ["income-categories"],
        queryFn: async () => {
          const res = await axios.get<CategoryResponse>(getIncomeCategoriesEndPoint, { withCredentials: true });
          return {
            ...res.data,
            categories: res.data.categories.map((cat) => ({
              ...cat,
              dateCreated: new Date(cat.dateCreated),
            })),
          };
        },
      },
    ],
  });

  const isLoading = results.some((q) => q.isLoading);
  const isError = results.some((q) => q.isError);
  const error = results.find((q) => q.isError)?.error as Error | undefined;

  return { isLoading, isError, error };
};
