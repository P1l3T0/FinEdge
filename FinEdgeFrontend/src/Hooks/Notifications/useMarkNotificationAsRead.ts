import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { markNotificationAsReadEndPoint } from "../../Utils/endpoints";

const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  const markNotificationAsRead = async (notificationId: number) => {
    await axios
      .put(`${markNotificationAsReadEndPoint}/${notificationId}`, { withCredentials: true })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleMarkAsRead = async (notificationId: number) => {
    await mutateAsync(notificationId);
  };

  return { handleMarkAsRead };
};

export default useMarkNotificationAsRead;