import useGetLatestNotification from "../../Hooks/Notifications/useGetLatestUnreadNotification";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import { AppNotification, NotificationType } from "../../Utils/Types";
import { useEffect, useState } from "react";
import { Notification as KendoNotification, NotificationGroup } from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";

const LatestUnreadNotification = () => {
  const { data } = useGetLatestNotification();
  const [notification, setNotification] = useState<AppNotification | null>(null);

  useEffect(() => {
    if (data) {
      setNotification(data);
    }
  }, [data]);

  const handleClose = () => {
    setNotification(null);
  }

  return (
    <>
      <NotificationGroup
        style={{
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}>
        {notification && (
          <Fade key={notification.id}>
            <KendoNotification
              type={{
                style: getEnumValueFromNumber(parseInt(notification.notificationType), NotificationType).toLocaleLowerCase() as "error" | "none" | "success" | "warning" | "info" | undefined,
                icon: true,
              }}
              closable={true}
              onClose={handleClose}>
              <span>{notification.title}</span>
            </KendoNotification>
          </Fade>
        )}
      </NotificationGroup>
    </>
  );
};

export default LatestUnreadNotification;
