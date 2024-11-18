import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getCurrentUserEnddPoint } from "../../endpoints";
import { MethodologyType, User } from "../../Utils/Types";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import AccountsGrid from "./Details/AccountsGrid";
import CategoriesGrid from "./Details/CategoriesGrid";
import TransactionsGrid from "./Details/TransactionsGrid";

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
    queryFn: getUser,
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
        Total Balance: {data?.totalBalance} <br />
        Methodology: {getEnumValueFromNumber(parseInt(data?.methodologyType!), MethodologyType)} <br />

        <UpdateUser user={data!} />
        <DeleteUser />
      </div>

      <AccountsGrid accounts={data?.accounts!} />
      <CategoriesGrid categories={data?.categories!} />
      <TransactionsGrid transactions={data?.transactions!} />
    </>
  )
}

export default GetUser;