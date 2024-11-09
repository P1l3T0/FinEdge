import axios, { AxiosError, AxiosResponse } from "axios";
import { logoutEndPoint } from "../../endpoints";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";

type User = {
  name: string;
  surname: string
  email: string;
  password: string
}

const Logout = ({ setCurrentUser }: { setCurrentUser: (user: User | undefined) => void }) => {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  const onClick = async () => {
    axios
      .post(`${logoutEndPoint}`, {}, { withCredentials: true })
      .then((res: AxiosResponse) => {
        alert(res.data.message);
        setShouldRedirect(true);
        setCurrentUser(undefined);
      })
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  };

  return (
    <>
      <Button id="logout" onClick={onClick}>Log out</Button>
    </>
  );
};

export default Logout;
