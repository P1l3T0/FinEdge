import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getCurrentUserEnddPoint } from "../endpoints";
import { MethodologyType, User } from "../Utils/Types";
import { getEnumValueFromNumber } from "../Utils/Functions";

const GetUser = () => {
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
    queryFn: getUser
  })

  const { data, isLoading, isError, error } = accountsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>
        Name: {data?.name} <br />
        Surname: {data?.surname} <br />
        Email: {data?.email} <br />
        Methodology: {getEnumValueFromNumber(parseInt(data?.methodologyType!), MethodologyType)}
      </div>
    </>
  )
}

export default GetUser;