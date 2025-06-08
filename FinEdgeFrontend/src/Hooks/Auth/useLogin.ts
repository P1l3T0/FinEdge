import { SyntheticEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { LoginDTO } from "../../Utils/Types";
import { loginEndPoint } from "../../Utils/endpoints";
import { TextBoxChangeEvent } from "@progress/kendo-react-inputs";

const useLogin = () => {
  const queryClient = useQueryClient();

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
      .then(() => window.location.href = "/home")
      .catch((error: AxiosError) => {
        throw error;
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
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