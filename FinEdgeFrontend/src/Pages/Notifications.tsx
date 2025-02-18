import NotificationsData from "../Components/Notifications/NotificationData/NotificationsData";
import NotificationHeader from "../Components/Notifications/NotificationsHeader/NotificationHeader";

const Notifications = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <NotificationHeader />
        <NotificationsData />
      </div>
    </>
  );
};

export default Notifications;
