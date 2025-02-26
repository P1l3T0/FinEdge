import { Trash } from "lucide-react";
import { AppNotification } from "../../../Utils/Types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteNotificationEndPoint } from "../../../endpoints";

const DeleteNotification = ({ notification }: { notification: AppNotification }) => {
  const queryClient = useQueryClient();

  const updateNotification = async () => {
    await axios
      .delete(`${deleteNotificationEndPoint}/${notification?.id}`, { withCredentials: true })
      .catch((error: AxiosError) => {});
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleDelete = async () => {
    await mutateAsync();
  };

  return (
    <>
      {!notification.isRead && (
        <button onClick={handleDelete} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition">
          <Trash size={20} />
        </button>
      )}
    </>
  );
};

export default DeleteNotification;