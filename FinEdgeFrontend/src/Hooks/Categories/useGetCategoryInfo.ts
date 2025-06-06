import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getCategoryInfoEndPoint } from '../../Utils/endpoints';
import { CategoryInfo } from '../../Utils/Types';

const useGetCategoryInfo = () => {
  const getCategoryInfo = async () => {
    return await axios
      .get<CategoryInfo>(`${getCategoryInfoEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<CategoryInfo>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No categories found ${err.message}`);
      });
  };

  const categoriesInfoQuery = useQuery({
    queryKey: ["category-info"],
    queryFn: getCategoryInfo
  })

  const { data } = categoriesInfoQuery;

  return { data }
}

export default useGetCategoryInfo;