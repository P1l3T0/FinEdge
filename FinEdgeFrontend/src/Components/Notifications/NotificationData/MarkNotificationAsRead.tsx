import { Check } from "lucide-react";
import { AppNotification } from "../../../Utils/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { markNotificationAsReadEndPoint } from "../../../Utils/endpoints";

const MarkNotificationAsRead = ({ notification }: { notification: AppNotification }) => {
  const queryClient = useQueryClient();

  const markNotificationAsRead = async () => {
    await axios
      .put(`${markNotificationAsReadEndPoint}/${notification?.id}`, { withCredentials: true })
      .catch((error: AxiosError) => {});
  };

  const { mutateAsync } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleMarkAsRead = async () => {
    await mutateAsync();
  };

  return (
    <>
      {!notification.isRead && (
        <button onClick={handleMarkAsRead} className="text-green-500 hover:bg-green-100 p-2 rounded-full transition">
          <Check size={20} />
        </button>
      )}
    </>
  );
};

export default MarkNotificationAsRead;