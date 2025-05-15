import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getAccountAndCategoryNamesEnddPoint } from "../../Utils/endpoints";
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

  const accountAndCategoryNamesQuery = useQuery({
    queryKey: ["names"],
    queryFn: getAccountAndCategoryNames
  })

  const { data } = accountAndCategoryNamesQuery;

  return { data };
}

export default useGetNames;