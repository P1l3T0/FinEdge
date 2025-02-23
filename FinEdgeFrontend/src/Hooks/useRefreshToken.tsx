import axios from "../Components/Axios/axios";
import { refreshTokenEndPoint } from "../endpoints";
import { RefreshToken } from "../Utils/Types";
import { useRef, useState } from "react";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const tokenRefreshTimeout = useRef<NodeJS.Timeout | null>(null);
  const cookies = document.cookie.split("=")[1];
  const [refreshToken, setRefreshToken] = useState<RefreshToken>({
    refreshToken: cookies
  });

  const refresh = async () => {
    const response = await axios.post(`${refreshTokenEndPoint}`, refreshToken, { withCredentials: true })
    const { username, newAccessToken, newRefreshToken, expiresIn } = response.data;

    setAuth(prev => ({
      ...prev,
      username,
      accessToken: newAccessToken,
    }));

    setRefreshToken(newRefreshToken);
    setTokenRefreshTimer(expiresIn - 10);

    return newAccessToken;
  }

  const setTokenRefreshTimer = (expiresIn: number) => {
    if (tokenRefreshTimeout.current) {
      clearTimeout(tokenRefreshTimeout.current);
    }

    tokenRefreshTimeout.current = setTimeout(() => {
      refresh();
    }, expiresIn * 1000);
  };

  return refresh;
}

export default useRefreshToken