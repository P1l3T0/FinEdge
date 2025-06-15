import { SyntheticEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { LoginDTO } from "../../Utils/Types";
import { loginEndPoint } from "../../Utils/endpoints";
import { TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useUserDataQueries } from "../User/useIsUserDataLoading";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { refetchUser, refetchCategoryInfo, refetchReports, refetchUserData } = useUserDataQueries();

  const [user, setUser] = useState<LoginDTO>({
    email: "",
    password: "",
  });

  const handleChange = (e: TextBoxChangeEvent) => {
    const trimmedValue: string = (e.target.value as string).trim();

    setUser({
      ...user,
      [e.target.name as string]: trimmedValue,
    });
  };

  const loginUser = async () => {
    await axios
      .post<LoginDTO>(`${loginEndPoint}`, user, { withCredentials: true })
      .then(() => navigate("/home"))
      .catch((error: AxiosError) => {
        throw error;
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      login();
      refetchUser();
      refetchReports();
      refetchUserData();
      refetchCategoryInfo();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError) => {
      alert(error.response?.data);
    },
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return { handleChange, onSubmit };
};

export default useLogin;
