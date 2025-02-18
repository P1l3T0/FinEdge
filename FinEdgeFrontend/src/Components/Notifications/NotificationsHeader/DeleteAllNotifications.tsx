import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { deleteAllNotificationsEndPoint } from "../../../endpoints";

const DeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  const deleteAllNotifications = async () => {
    debugger
    await axios
      .delete(deleteAllNotificationsEndPoint, { withCredentials: true })
      .catch((err: AxiosError) => {
        throw new Error(`No notifications found ${err.message}`);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleDelete = async () => {
    await mutateAsync();
  };

  return (
    <>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={handleDelete}>
        Delete All
      </button>
    </>
  );
};

export default DeleteAllNotifications;
