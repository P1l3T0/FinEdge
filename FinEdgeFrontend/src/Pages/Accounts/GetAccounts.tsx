import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getAllAccountsEndPoint } from '../../endpoints';
import { Account, AccountType } from '../../Utils/Types';
import { Card, CardBody, CardHeader, CardFooter } from '@progress/kendo-react-all';
import { getEnumValueFromNumber } from '../../Utils/Functions';
import DeleteButton from './DeleteAccounts';
import UpdateButton from './UpdateButton';

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

  return (
    <>
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
              <UpdateButton account={account} />
              <DeleteButton account={account} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default GetAccounts;