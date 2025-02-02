import { Fade, Notification as KendoNotification, NotificationGroup } from "@progress/kendo-react-all";
import useGetLatestNotification from "../../Hooks/useGetLatestUnreadNotification";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import { AppNotification, NotificationType } from "../../Utils/Types";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsReadAsync } from "../../endpoints";

const LatestUnreadNotification = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetLatestNotification();
  const [notification, setNotification] = useState<AppNotification | null>(null);

  useEffect(() => {
    if (data) {
      setNotification(data);
    }
  }, [data]);

  const updateNotification = async () => {
    await axios
      .put(`${markNotificationAsReadAsync}/${notification?.id}`, { withCredentials: true })
      .then(() => setNotification(null))
      .catch((error: AxiosError) => {});
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleClose = async () => {
    await mutateAsync();
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
              <span>{notification.message}</span>
            </KendoNotification>
          </Fade>
        )}
      </NotificationGroup>
    </>
  );
};

export default LatestUnreadNotification;
