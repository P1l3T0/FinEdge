import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getPromptSuggestionsEndPoint } from "../../endpoints";

const useGetPromptSuggestions = () => {
  const getPromptSuggestions = async () => {
    return await axios
      .get<string[]>(`${getPromptSuggestionsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<string[]>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No prompt suggestions ${err.message}`);
      });
  };

  const promptSuggestionsQuery = useQuery({
    queryKey: ["promptSuggestions"],
    queryFn: getPromptSuggestions
  })

  const { data, isLoading, isError, error } = promptSuggestionsQuery;

  return { data, isLoading, isError, error }
}

export default useGetPromptSuggestions;