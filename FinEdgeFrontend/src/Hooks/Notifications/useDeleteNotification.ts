import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteNotificationEndPoint } from "../../Utils/endpoints";

const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  const deleteNotification = async (notificationId: number) => {
    await axios
      .delete(`${deleteNotificationEndPoint}/${notificationId}`, { withCredentials: true })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleDelete = async (notificationId: number) => {
    await mutateAsync(notificationId);
  };

  return { handleDelete };
};

export default useDeleteNotification;