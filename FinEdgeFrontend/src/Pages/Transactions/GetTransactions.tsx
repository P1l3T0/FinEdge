import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getTransactionEndPoint } from '../../endpoints';
import { TransactionResponse } from '../../Utils/Types';

const GetTransactions = () => {
  const getTransactions = async () => {
    return await axios
      .get<TransactionResponse>(`${getTransactionEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<TransactionResponse>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No transactions found ${err.message}`);
      });
  };

  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions
  })

  const { data, isLoading, isError, error } = transactionsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      lol
    </>
  )
}

export default GetTransactions