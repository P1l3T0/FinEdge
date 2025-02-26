import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getAccountAndCategoryNamesEnddPoint } from "../../endpoints";
import { Names } from "../../Utils/Types";

const useGetNames = () => {
  const getAccountAndCategoryNames = async () => {
    return await axios
      .get<Names>(`${getAccountAndCategoryNamesEnddPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<Names>) => {
        return res.data;
      })
      .catch((err: AxiosError) => {
        throw new Error(`No categories or names found ${err.message}`);
      });
  };

  const expenditureCategoriesQuery = useQuery({
    queryKey: ["names"],
    queryFn: getAccountAndCategoryNames
  })

  const { data, isLoading, isError, error } = expenditureCategoriesQuery;

  return { data, isLoading, isError, error };
}

export default useGetNames;