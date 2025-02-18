import { Bell } from "lucide-react";
import MarkAllNotificationsAsRead from "./MarkAllNotificationsAsRead";
import DeleteAllNotifications from "./DeleteAllNotifications";

const NotificationHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Bell className="mr-3 text-blue-600" size={28} />
          Notifications
        </h1>
        <div className="space-x-2">
          <MarkAllNotificationsAsRead />
          <DeleteAllNotifications />
        </div>
      </div>
    </>
  );
};

export default NotificationHeader;
