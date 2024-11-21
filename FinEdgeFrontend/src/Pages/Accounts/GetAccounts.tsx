import { AccountType } from '../../Utils/Types';
import { Card, CardBody, CardHeader, CardFooter } from '@progress/kendo-react-all';
import { getEnumValueFromNumber } from '../../Utils/Functions';
import DeleteAccount from './DeleteAccount';
import UpdateAccount from './UpdateAccount';
import useGetAccounts from '../../Hooks/useGetAccounts';

const GetAccounts = () => {
  const { data, isLoading, isError, error } = useGetAccounts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <div className="account-cards">
        {data?.map((account, index) => (
          <Card key={index}>
            <CardHeader>Account name: {account.name}</CardHeader>
            <CardBody>
              <fieldset>
                <legend>Details</legend>
                Account Type: {getEnumValueFromNumber(parseInt(account.accountType), AccountType)} <br />
                Balance: {account.balance} {account.currency} <br />
                Created at: {
                  new Date(account.dateCreated).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                }
              </fieldset>
            </CardBody>
            <CardFooter>
              <UpdateAccount account={account} />
              <DeleteAccount account={account} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default GetAccounts;