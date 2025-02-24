import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "../../../Hooks/Auth/useAuth";
import useRefreshToken from "../../../Hooks/Auth/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [])

  return (
    <>
      {isLoading ? "Loading..." : <Outlet />}
    </>
  )
}

export default PersistLogin
