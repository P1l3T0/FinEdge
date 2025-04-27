import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getCategoryPromptSuggestionsEndPoint } from "../../Utils/endpoints";

const useGetCategoryPromptSuggestions = () => {
  const getCategoryPromptSuggestions = async () => {
    return await axios
      .get<string[]>(`${getCategoryPromptSuggestionsEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<string[]>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No prompt suggestions ${err.message}`);
      });
  };

  const categoryPromptSuggestionsQuery = useQuery({
    queryKey: ["categoryPromptSuggestions"],
    queryFn: getCategoryPromptSuggestions,
  });

  const { data, isLoading, isError, error } = categoryPromptSuggestionsQuery;

  return { data, isLoading, isError, error }
}

export default useGetCategoryPromptSuggestions;