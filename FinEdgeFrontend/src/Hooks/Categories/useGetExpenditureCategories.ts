import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getExpenditureCategoriesEndPoint } from "../../Utils/endpoints";
import { CategoryResponse } from "../../Utils/Types";

const useGetExpenditureCategories = () => {
  const getExpenditureCategories = async () => {
    return await axios
      .get<CategoryResponse>(`${getExpenditureCategoriesEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<CategoryResponse>) => {
        return {
          ...res.data,
          categories: res.data.categories.map((category) => ({
            ...category,
            dateCreated: new Date(category.dateCreated),
          })),
        }})
      .catch((err: AxiosError) => {
        throw new Error(`No categories found ${err.message}`);
      });
  };

  const expenditureCategoriesQuery = useQuery({
    queryKey: ["expenditure-categories"],
    queryFn: getExpenditureCategories,
  });

  const { data } = expenditureCategoriesQuery;

  return { data }
}

export default useGetExpenditureCategories;