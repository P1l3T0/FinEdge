import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { deleteFinancialRecommendationEndPoint } from '../../Utils/endpoints';
import { Button } from '@progress/kendo-react-buttons';

const DeleteFinancialRecommendations = () => {
  const queryClient = useQueryClient();

  const deleteFinancialRecommendations = async () => {
    await axios
      .delete(deleteFinancialRecommendationEndPoint, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No recommendations found ${err.message}`);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: deleteFinancialRecommendations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"], });
    },
  });

  const handleDelete = async () => {
    mutateAsync();
  }

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'error'} onClick={handleDelete}>Delete</Button>
    </>
  )
}

export default DeleteFinancialRecommendations;