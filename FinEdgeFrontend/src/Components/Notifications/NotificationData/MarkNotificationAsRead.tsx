import { Check } from "lucide-react";
import { AppNotification } from "../../../Utils/Types";
import useMarkNotificationAsRead from "../../../Hooks/Notifications/useMarkNotificationAsRead";

const MarkNotificationAsRead = ({ notification }: { notification: AppNotification }) => {
  const { handleMarkAsRead } = useMarkNotificationAsRead();

  const onMarkAsReadClick = async () => {
    await handleMarkAsRead(notification.id);
  };

  return (
    <>
      {!notification.isRead && (
        <button onClick={onMarkAsReadClick} className="text-green-500 hover:bg-green-100 p-2 rounded-full transition">
          <Check size={20} />
        </button>
      )}
    </>
  );
};

export default MarkNotificationAsRead;