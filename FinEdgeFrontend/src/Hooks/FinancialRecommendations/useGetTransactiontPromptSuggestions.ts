import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getTransactionPromptSuggestionsEndPoint } from "../../Utils/endpoints";

const useGetTransactionPromptSuggestions = () => {
  const getTransactionPromptSuggestions = async () => {
    return await axios
      .get<string[]>(`${getTransactionPromptSuggestionsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<string[]>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No prompt suggestions ${err.message}`);
      });
  };

  const transactionPromptSuggestionsQuery = useQuery({
    queryKey: ["transactionPromptSuggestions"],
    queryFn: getTransactionPromptSuggestions,
  });

  const { data } = transactionPromptSuggestionsQuery;

  return { data }
}

export default useGetTransactionPromptSuggestions;