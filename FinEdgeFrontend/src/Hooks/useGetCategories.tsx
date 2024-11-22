import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getAllCategoriesEndPoint } from "../endpoints";
import { CategoryResponse } from "../Utils/Types";

const usesGetCategories = () => {
  const getCategories = async () => {
    return await axios
      .get<CategoryResponse>(`${getAllCategoriesEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<CategoryResponse>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No categories found ${err.message}`);
      });
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  const { data, isLoading, isError, error } = categoriesQuery;

  return { data, isLoading, isError, error }
}

export default usesGetCategories;