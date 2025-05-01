import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { updateCurrentUserEnddPoint } from "../../Utils/endpoints";
import { MethodologyType, UpdateDTO, User } from "../../Utils/Types";
import { getEnumValueFromNumber } from "../../Utils/Functions";

const useUpdateUser = (user: User) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<UpdateDTO>({
    name: user.name,
    surname: user.surname,
    methodologyType: getEnumValueFromNumber(parseInt(user.methodologyType), MethodologyType),
    email: user.email,
    password: "",
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleTextBoxChange = (e: any) => {
    const trimmedValue = (e.value as string).trim();

    setUpdatedUser({
      ...updatedUser,
      [e.target.name as string]: trimmedValue,
    });
  };

  const handleDropDownChange = (e: any) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.props.name as string]: e.value,
    });
  };

  const updateUser = async () => {
    await axios
      .put<UpdateDTO>(`${updateCurrentUserEnddPoint}/${user.id}`, updatedUser, { withCredentials: true })
      .then(() => setUpdatedUser({
        ...updatedUser,
        password: "",
      }))
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  };

  return { visible, updatedUser, toggleDialog, handleTextBoxChange, handleDropDownChange, handleUpdate };
};

export default useUpdateUser;