import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getCurrentUserEnddPoint } from "../endpoints";
import { User } from "../Utils/Types";

const useGetUser = () => {
  const getUser = async () => {
    return await axios
      .get<User>(`${getCurrentUserEnddPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<User>) => res.data)
      .catch((err: AxiosError) => {});
  };

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!document.cookie.includes("RefreshToken"),
  });

  const { data, isLoading, isError, error } = userQuery;

  return { data, isLoading, isError, error };
};

export default useGetUser;