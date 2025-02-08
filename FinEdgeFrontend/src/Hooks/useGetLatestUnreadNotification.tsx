import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from "react";
import { AppNotification } from "../Utils/Types";
import { getNotificationHubEndPoint, getLatestUnreadNotificationEndPoint } from "../endpoints"; 

const getLatestUnreadNotification = async (): Promise<AppNotification | null> => {
  return await axios
    .get<AppNotification>(`${getLatestUnreadNotificationEndPoint}`, { withCredentials: true })
    .then((res: AxiosResponse<AppNotification>) => res.data)
    .catch((err: AxiosError) => {
      return null;
    });
};

const useGetLatestNotification = () => {
  const queryClient = useQueryClient();

  const latestNotificationQuery = useQuery({
    queryKey: ["latestNotification"],
    queryFn: getLatestUnreadNotification,
    refetchInterval: 10000, 
    enabled: document.cookie.includes("RefreshToken"),
  });

  const { data, isLoading, isError, error } = latestNotificationQuery;

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(getNotificationHubEndPoint)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .catch((err) => console.error("SignalR Connection Error", err));

    connection.on("ReceiveNotification", (newNotification: AppNotification) => {
      queryClient.setQueryData(["latestNotification"], newNotification);
    });

    return () => {
      connection.stop();
    };
  }, [queryClient]);

  return { data, isLoading, isError, error };
};

export default useGetLatestNotification;
