import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getIncomeCategoriesEndPoint } from "../../Utils/endpoints";
import { CategoryResponse } from "../../Utils/Types";

const useGetIncomeCategories = () => {
  const getIncomeCategories = async () => {
    return await axios
      .get<CategoryResponse>(`${getIncomeCategoriesEndPoint}`, { withCredentials: true })
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

  const incomeCategoriesQuery = useQuery({
    queryKey: ["income-categories"],
    queryFn: getIncomeCategories,
  });

  const { data } = incomeCategoriesQuery;

  return { data }
}

export default useGetIncomeCategories;