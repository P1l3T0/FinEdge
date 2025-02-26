import { Bell } from "lucide-react";
import MarkAllNotificationsAsRead from "./MarkAllNotificationsAsRead";
import DeleteAllNotifications from "./DeleteAllNotifications";

const NotificationHeader = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center mb-4 sm:mb-0">
          <Bell className="mr-3 text-blue-600" size={28} />
          Notifications
        </h1>
        <div className="flex space-x-2 sm:space-x-2 sm:flex-row sm:w-auto">
          <MarkAllNotificationsAsRead />
          <DeleteAllNotifications />
        </div>
      </div>
    </>
  );
};

export default NotificationHeader;
