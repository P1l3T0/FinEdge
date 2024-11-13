import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getAllAccountsEndPoint } from '../../endpoints';
import { Account } from '../../Utils/Types';
import { Grid, GridColumn as Column } from '@progress/kendo-react-all';

const GetAccounts = () => {
  const getAccounts = async (): Promise<Account[]> => {
    return await axios
      .get(`${getAllAccountsEndPoint}`, { withCredentials: true })
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
      <Grid data={data} style={{ width: "820px", height: "auto" }}>
        <Column field="id" title="ID" width="50px" />
        <Column field="userID" title="UserID" width="75px" />
        <Column field="name" title="Name" width="100px" />
        <Column field="balance" title="Balance" width="100px" />
        <Column field="currency" title="Currency" width="100px" />
        <Column field="accountType" title="Account Type" width="125px" />
        <Column field="dateCreated" title="Date Created" width="250px" />
      </Grid>
    </>
  )
}

export default GetAccounts;