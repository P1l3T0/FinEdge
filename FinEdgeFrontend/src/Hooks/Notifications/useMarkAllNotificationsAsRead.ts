import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { markAllNotificationsAsReadEndPoint } from "../../Utils/endpoints";

const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  const markAllNotificationsAsRead = async () => {
    await axios
      .post(markAllNotificationsAsReadEndPoint, {}, { withCredentials: true })
      .catch((err: AxiosError) => {
        console.error(`Error marking all notifications as read: ${err.message}`);
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

  return { handleMarkAllAsRead };
};

export default useMarkAllNotificationsAsRead;