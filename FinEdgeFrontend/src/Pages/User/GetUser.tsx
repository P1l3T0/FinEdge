import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getCurrentUserEnddPoint } from "../../endpoints";
import { AccountType, MethodologyType, User } from "../../Utils/Types";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import { Grid, GridColumn as Column, GridCellProps } from "@progress/kendo-react-all";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

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

  const AccountTypeCell = (props: GridCellProps) => {
    const accountTypeValue: number = props.dataItem[props.field || ''];
    const accountTypeLabel: string = getEnumValueFromNumber(accountTypeValue, AccountType);
    return <td>{accountTypeLabel}</td>;
  };

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

      <h2>Accounts</h2>
      <Grid data={data?.accounts} style={{ width: "820px", height: "auto" }}>
        <Column field="id" title="ID" width="50px" />
        <Column field="userID" title="UserID" width="75px" />
        <Column field="name" title="Name" width="100px" />
        <Column field="balance" title="Balance" width="100px" />
        <Column field="currency" title="Currency" width="100px" />
        <Column field="accountType" title="Account Type" width="125px" cell={AccountTypeCell} />
        <Column field="dateCreated" title="Date Created" width="250px" format="{0:dd/mm/yyyy}" />
      </Grid>
    </>
  )
}

export default GetUser;