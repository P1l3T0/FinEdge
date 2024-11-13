import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getAllAccountsEndPoint } from '../../endpoints';
import { Account } from '../../Utils/Types';
import { Grid, GridColumn as Column } from '@progress/kendo-react-all';

const GetAccounts = () => {
  const getAccounts = async (): Promise<Account[]> => {
    return axios
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
      <Grid data={data} style={{ width: "1230px", height: "auto" }}>
        <Column field="id" title="ID" width="50px" filterable={false} />
        <Column field="userID" title="UserID" width="100px" filterable={false} />
        <Column field="name" title="Name" width="250px" filter="text" />
        <Column field="balance" title="Balance" filter="numeric" width="200px" />
        <Column field="currency" title="Currency" width="200px" filter="text" />
        <Column field="accountType" title="Account Type" width="150px" filter="text" />
        <Column field="dateCreated" title="Date Created" width="250px" filter="date" />
      </Grid>
    </>
  )
}

export default GetAccounts;