import { useState, useEffect, SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { RegisterDTO } from "../../Utils/Types";
import { registerEndPoint } from "../../Utils/endpoints";
import { isValidEmail, isValidPassword } from "../../Utils/Functions";

const useRegister = () => {
  const queryClient = useQueryClient();

  const emailRegEx = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$");

  const [emailError, setEmailError] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(true);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<RegisterDTO>({
    name: "",
    surname: "",
    email: "",
    password: "",
    methodologyType: "",
  });

  useEffect(() => {
    setIsNextButtonDisabled(emailError || passwordError);
  }, [emailError, passwordError]);

  const handleChange = (e: any) => {
    const trimmedValue: string = (e.target.value as string).trim();

    if (e.target.name === "email") {
      setEmailError(!isValidEmail(trimmedValue, emailRegEx));
    } else if (e.target.name === "password") {
      setPasswordError(!isValidPassword(trimmedValue, passwordRegEx));
    }

    setUser({
      ...user,
      [e.target.name as string]: trimmedValue,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNextButtonClicked(!isNextButtonClicked);
  };

  const handleMethodologyChange = (value: string) => {
    setIsRegisterButtonDisabled(false);
    setUser({
      ...user,
      methodologyType: value,
    });
  };

  const registerUser = async () => {
    await axios
      .post<RegisterDTO>(`${registerEndPoint}`, user, { withCredentials: true })
      .then(() => window.location.href = "/home")
      .catch((error: AxiosError) => {
        throw error;
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    mutateAsync();
  };

  return { isNextButtonDisabled, isNextButtonClicked, isRegisterButtonDisabled, handleChange, handleClick, handleMethodologyChange, handleSubmit };
};

export default useRegister;