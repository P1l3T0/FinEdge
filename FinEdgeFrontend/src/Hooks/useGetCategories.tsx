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

  const incomeCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  const { data, isLoading, isError, error } = incomeCategoriesQuery;

  return { data, isLoading, isError, error }
}

export default usesGetCategories;