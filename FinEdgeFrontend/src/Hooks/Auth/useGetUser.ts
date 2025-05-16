import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getCurrentUserEnddPoint } from "../../Utils/endpoints";
import { User } from "../../Utils/Types";

const useGetUser = () => {
  const getUser = async () => {
    return await axios
      .get<User>(`${getCurrentUserEnddPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<User>) => {
        return {
          ...res.data,
          dateCreated: new Date(res.data.dateCreated),
        }
      })
      .catch((err: AxiosError) => {});
  };

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!document.cookie.includes("RefreshToken"),
  });

  const { data } = userQuery;

  return { data };
};

export default useGetUser;