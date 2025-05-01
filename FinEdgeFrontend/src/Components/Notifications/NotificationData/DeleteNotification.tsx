import { Trash } from "lucide-react";
import { AppNotification } from "../../../Utils/Types";
import useDeleteNotification from "../../../Hooks/Notifications/useDeleteNotification";

const DeleteNotification = ({ notification }: { notification: AppNotification }) => {
  const { handleDelete } = useDeleteNotification();

  const onDeleteClick = async () => {
    await handleDelete(notification.id);
  };

  return (
    <>
      {!notification.isRead && (
        <button onClick={onDeleteClick} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition">
          <Trash size={20} />
        </button>
      )}
    </>
  );
};

export default DeleteNotification;