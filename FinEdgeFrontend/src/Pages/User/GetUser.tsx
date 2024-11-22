import { MethodologyType } from "../../Utils/Types";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import AccountsGrid from "./Details/AccountsGrid";
import CategoriesGrid from "./Details/CategoriesGrid";
import TransactionsGrid from "./Details/TransactionsGrid";
import useGetUser from "../../Hooks/useGetUser";
import CategoriesInfo from "./Details/CategoriesInfo";

const GetUser = () => {
  const { data, isLoading, isError, error } = useGetUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

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

      <CategoriesInfo />
    </>
  )
}

export default GetUser;