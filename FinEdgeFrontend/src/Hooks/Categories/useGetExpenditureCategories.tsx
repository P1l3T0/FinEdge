import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getExpenditureCategoriesEndPoint } from "../../endpoints";
import { CategoryResponse } from "../../Utils/Types";

const usesGetExpenditureCategories = () => {
  const getExpenditureCategories = async () => {
    return await axios
      .get<CategoryResponse>(`${getExpenditureCategoriesEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<CategoryResponse>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No categories found ${err.message}`);
      });
  };

  const expenditureCategoriesQuery = useQuery({
    queryKey: ["expenditure-categories"],
    queryFn: getExpenditureCategories,
  });

  const { data, isLoading, isError, error } = expenditureCategoriesQuery;

  return { data, isLoading, isError, error }
}

export default usesGetExpenditureCategories;