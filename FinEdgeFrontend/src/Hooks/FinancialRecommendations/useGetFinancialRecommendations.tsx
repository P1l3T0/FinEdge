import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getFinancialRecommendationEndPoint } from "../../endpoints";
import { FinancialRecommendation } from "../../Utils/Types";

const useGetFinancialRecommendations = () => {
  const getFinancialRecommendations = async () => {
    return await axios
      .get<FinancialRecommendation>(`${getFinancialRecommendationEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<FinancialRecommendation>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No recommendations found ${err.message}`);
      });
  };

  const financialRecommendationsQuery = useQuery({
    queryKey: ["recommendations"],
    queryFn: getFinancialRecommendations,
  });

  const { data, isLoading, isError, error } = financialRecommendationsQuery;

  return { data, isLoading, isError, error };
};

export default useGetFinancialRecommendations;