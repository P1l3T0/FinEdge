import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getAllAccountsEndPoint } from '../../endpoints';
import { Account, AccountType } from '../../Utils/Types';
import { Grid, GridColumn as Column, GridCellProps, Card, Button, CardBody, CardHeader, CardFooter } from '@progress/kendo-react-all';
import { getEnumValueFromNumber } from '../../Utils/Functions';
import DeleteButton from './DeleteAccounts';

const GetAccounts = () => {
  const getAccounts = async () => {
    return await axios
      .get<Account[]>(`${getAllAccountsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<Account[]>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No accounts found ${err.message}`);
      });
  };

  const accountsQuery = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts
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
      <Grid data={data} style={{ width: "820px", height: "auto" }}>
        <Column field="id" title="ID" width="50px" />
        <Column field="userID" title="UserID" width="75px" />
        <Column field="name" title="Name" width="100px" />
        <Column field="balance" title="Balance" width="100px" />
        <Column field="currency" title="Currency" width="100px" />
        <Column field="accountType" title="Account Type" width="125px" cell={AccountTypeCell} />
        <Column field="dateCreated" title="Date Created" width="250px" />
      </Grid>

      <div className="account-cards">
        {data?.map((account, index) => (
          <Card key={index}>
            <CardHeader>Account name: {account.name}</CardHeader>
            <CardBody>
              Account Type: {getEnumValueFromNumber(parseInt(account.accountType), AccountType)} <br />
              Balance: {account.balance} {account.currency} <br />
              Created at: {
                new Date(account.dateCreated).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
            </CardBody>
            <CardFooter>
              <Button type="button" fillMode="solid" themeColor={'primary'}>Update</Button>
              <DeleteButton accountID={account.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default GetAccounts;