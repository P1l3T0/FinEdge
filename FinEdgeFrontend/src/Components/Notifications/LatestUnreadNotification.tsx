import { Fade, Notification as KendoNotification, NotificationGroup } from "@progress/kendo-react-all";
import useGetLatestNotification from "../../Hooks/Notifications/useGetLatestUnreadNotification";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import { AppNotification, NotificationType } from "../../Utils/Types";
import { useEffect, useState } from "react";

const LatestUnreadNotification = () => {
  const { data, isLoading, isError, error } = useGetLatestNotification();
  const [notification, setNotification] = useState<AppNotification | null>(null);

  useEffect(() => {
    if (data) {
      setNotification(data);
    }
  }, [data]);

  const handleClose = () => {
    setNotification(null);
  }

  if (isLoading) return null;
  if (isError) return <p>Error: {error!.message}</p>;

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
