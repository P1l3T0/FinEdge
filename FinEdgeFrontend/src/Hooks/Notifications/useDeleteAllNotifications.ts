import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteAllNotificationsEndPoint } from "../../Utils/endpoints";

const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  const deleteAllNotifications = async () => {
    await axios
      .delete(deleteAllNotificationsEndPoint, { withCredentials: true })
      .catch((err: AxiosError) => {
        console.error(`No notifications found: ${err.message}`);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleDeleteAll = async () => {
    await mutateAsync();
  };

  return { handleDeleteAll };
};

export default useDeleteAllNotifications;