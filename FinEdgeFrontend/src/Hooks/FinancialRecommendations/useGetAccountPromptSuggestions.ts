import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getAccountPromptSuggestionsEndPoint } from "../../Utils/endpoints";

const useGetAccountPromptSuggestions = () => {
  const getAccountPromptSuggestions = async () => {
    return await axios
      .get<string[]>(`${getAccountPromptSuggestionsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<string[]>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No prompt suggestions ${err.message}`);
      });
  };

  const accountPromptSuggestionsQuery = useQuery({
    queryKey: ["accountPromptSuggestions"],
    queryFn: getAccountPromptSuggestions,
  });

  const { data, isLoading, isError, error } = accountPromptSuggestionsQuery;

  return { data, isLoading, isError, error }
}

export default useGetAccountPromptSuggestions;