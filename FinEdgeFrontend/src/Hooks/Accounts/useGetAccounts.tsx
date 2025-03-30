import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getAllAccountsEndPoint } from "../../Utils/endpoints";
import { Account } from "../../Utils/Types";

const useGetAccounts = () => {
  const getAccounts = async () => {
    return await axios
      .get<Account[]>(`${getAllAccountsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<Account[]>) => {
        return res.data.map((account) => ({
          ...account,
          dateCreated: new Date(account.dateCreated),
        }));
      })
      .catch((err: AxiosError) => {
        throw new Error(`No accounts found ${err.message}`);
      });
  };

  const accountsQuery = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts
  })

  const { data, isLoading, isError, error } = accountsQuery;

  return { data, isLoading, isError, error }
}

export default useGetAccounts;