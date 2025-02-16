import { Card, CardBody, CardHeader, CardFooter } from "@progress/kendo-react-all";
import useGetAccounts from "../../Hooks/Accounts/useGetAccounts";
import AccountCardHeader from "../../Components/AccountsPage/Cards/AccountCardHeader";
import AccountCardBody from "../../Components/AccountsPage/Cards/AccountCardBody";
import AccountCardFooter from "../../Components/AccountsPage/Cards/AccountCardFooter";

const GetAccounts = () => {
  const { data, isLoading, isError, error } = useGetAccounts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      {data?.map((account, index) => (
        <Card key={index} className="shadow-md hover:shadow-xl duration-300 ease-in-out">
          <CardHeader>
            <AccountCardHeader account={account} />
          </CardHeader>
          <CardBody>
            <AccountCardBody account={account} />
          </CardBody>
          <CardFooter>
            <AccountCardFooter account={account} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default GetAccounts;
