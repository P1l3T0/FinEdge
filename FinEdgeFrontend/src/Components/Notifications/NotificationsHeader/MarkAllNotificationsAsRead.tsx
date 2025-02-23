import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { markAllNotificationsAsReadEndPoint } from '../../../endpoints';

const MarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  const markAllNotificationsAsRead = async () => {
    await axios
      .post(markAllNotificationsAsReadEndPoint, {}, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No notifications found ${err.message}`);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleMarkAllAsRead = async () => {
    await mutateAsync();
  };

  return (
    <>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" type='button' onClick={handleMarkAllAsRead}>
        Mark All Read
      </button>
    </>
  );
}

export default MarkAllNotificationsAsRead;