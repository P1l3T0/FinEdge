import axios, { AxiosError } from "axios";
import { logoutEndPoint } from "../../endpoints";
import { useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";

const Logout = () => {
  const navigate = useNavigate();

  const onClick = async () => {
    axios
      .post(`${logoutEndPoint}`, {}, { withCredentials: true })
      .then(() => navigate("/login"))
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
