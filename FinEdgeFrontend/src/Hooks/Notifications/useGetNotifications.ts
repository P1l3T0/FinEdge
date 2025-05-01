import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from "react";
import { getNotificationsEndPoint, getNotificationHubEndPoint } from "../../Utils/endpoints";
import { AppNotification } from "../../Utils/Types";

const getNotifications = async () => {
  return await axios
    .get<AppNotification[]>(`${getNotificationsEndPoint}`, { withCredentials: true })
    .then((res: AxiosResponse<AppNotification[]>) => res.data)
    .catch((err: AxiosError) => {
      throw new Error(`No notifications found: ${err.message}`);
    });
};

const useGetNotifications = () => {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const { data, isLoading, isError, error } = notificationsQuery;

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(getNotificationHubEndPoint)
      .withAutomaticReconnect()
      .build();

    connection.start()
      .catch(err => console.error("SignalR Connection Error", err));

    connection.on("ReceiveNotification", (message: string) => {
      queryClient.setQueryData(["notifications"], (oldData: string[] | undefined) => {
        return oldData ? [...oldData, message] : [message];
      });
    });

    return () => {
      connection.stop();
    };
  }, [queryClient]);

  return { data, isLoading, isError, error };
};

export default useGetNotifications;