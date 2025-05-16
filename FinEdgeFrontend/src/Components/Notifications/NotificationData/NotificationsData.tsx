import { Bell } from "lucide-react";
import DeleteNotification from "./DeleteNotification";
import useGetNotifications from "../../../Hooks/Notifications/useGetNotifications";
import MarkNotificationAsRead from "./MarkNotificationAsRead";

const NotificationsData = () => {
  const { data, } = useGetNotifications();

  const getNotificationColor = (type: number): string => {
    switch(type) {
      case 1: 
        return "bg-green-50 border-green-200";
      case 2: 
        return "bg-red-50 border-red-200";
      case 3: 
        return "bg-yellow-50 border-yellow-200";
      case 4: 
        return "bg-blue-50 border-blue-200";
    }

    return "";
  };

  return (
    <>
      {data?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Bell className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600 text-lg">No notifications</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data?.map((notification, index) => (
            <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${getNotificationColor(parseInt(notification.notificationType))} ${!notification.isRead ? "shadow-sm" : "opacity-70"}`}>
              <div className="flex-grow pr-4">
                <div className="flex items-center mb-2">
                  <h3 className={`font-semibold text-sm sm:text-lg ${!notification.isRead ? "text-gray-900" : "text-gray-600"}`}>{notification.title}</h3>
                  {!notification.isRead && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">New</span>
                  )}
                </div>
                <p className={`text-sm sm:text-xs ${!notification.isRead ? "text-gray-700" : "text-gray-500"}`}>{notification.description}</p>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(notification.dateCreated).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  })}
                </span>
              </div>
              <div className="flex space-x-2">
                <MarkNotificationAsRead notification={notification} />
                <DeleteNotification notification={notification} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationsData;