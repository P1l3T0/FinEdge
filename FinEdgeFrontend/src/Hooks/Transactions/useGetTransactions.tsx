import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getTransactionEndPoint } from '../../Utils/endpoints';
import { TransactionResponse } from '../../Utils/Types';

const useGetTransactions = () => {
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

  return { data, isLoading, isError, error }
}

export default useGetTransactions;