import AllNotifications from "./AllNotifications";
import LatestUnreadNotification from "./LatestUnreadNotification";

const NotificationsBase = () => {
  return (
    <>
      <AllNotifications />
      <LatestUnreadNotification />
    </>
  )
}

export default NotificationsBase;