import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getIncomeCategoriesEndPoint } from "../../Utils/endpoints";
import { CategoryResponse } from "../../Utils/Types";

const usesGetIncomeCategories = () => {
  const getIncomeCategories = async () => {
    return await axios
      .get<CategoryResponse>(`${getIncomeCategoriesEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<CategoryResponse>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No categories found ${err.message}`);
      });
  };

  const incomeCategoriesQuery = useQuery({
    queryKey: ["income-categories"],
    queryFn: getIncomeCategories,
  });

  const { data, isLoading, isError, error } = incomeCategoriesQuery;

  return { data, isLoading, isError, error }
}

export default usesGetIncomeCategories;