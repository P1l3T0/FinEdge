import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getCurrentUserEnddPoint } from "../endpoints";
import { User } from "../Utils/Types";

const useGetUser = () => {
  const getUser = async () => {
    return await axios
      .get<User>(`${getCurrentUserEnddPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<User>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No user logged in ${err.message}`);
      });
  };

  const accountsQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  })

  const { data, isLoading, isError, error } = accountsQuery;

  return { data, isLoading, isError, error }
}

export default useGetUser;