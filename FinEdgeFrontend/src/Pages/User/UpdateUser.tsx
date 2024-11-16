import { TextBoxChangeEvent, Button, TextBox, Window } from "@progress/kendo-react-all";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { updateCurrentUserEnddPoint } from "../../endpoints";
import { UpdateDTO, User } from "../../Utils/Types";

const UpdateUser = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<UpdateDTO>({
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: ""
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleTextBoxChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue = (e.value as string).trim();

    setUpdatedUser({
      ...updatedUser,
      [e.target.name as string]: trimmedValue
    })
  }

  const updateUser = async () => {
    if (updatedUser.password === "") {
      alert("Update your password!");
      return;
    }

    await axios
      .put<UpdateDTO>(`${updateCurrentUserEnddPoint}/${user.id}`, updatedUser, { withCredentials: true })
      .then(() => setUpdatedUser({
        ...updatedUser,
        password: ""
      }))
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleUpdate = async () => {
    await mutateAsync();
  }

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={'info'} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title={`Update account`} style={{ height: "auto" }} onClose={toggleDialog} initialHeight={350}>
          <form className="k-form">
            <fieldset>
              <legend>Account Details</legend>
              <TextBox id='name' type='text' name='name' placeholder="Name" defaultValue={user.name} onChange={handleTextBoxChange} />
              <TextBox id='surname' type='text' name='surname' placeholder="Surname" defaultValue={user.surname} onChange={handleTextBoxChange} />
              <TextBox id='email' type='email' name='email' placeholder="Email" defaultValue={user.email} onChange={handleTextBoxChange} />
              <TextBox id='password' type='password' name='password' placeholder="Password" defaultValue="" onChange={handleTextBoxChange} />
            </fieldset>

            <div className="buttonDiv">
              <Button type="button" onClick={handleUpdate} themeColor={'primary'}>Submit</Button>
              <Button type="button" onClick={toggleDialog} themeColor={'error'}>Cancel</Button>
            </div>
          </form>
        </Window>
      )}
    </>
  )
}

export default UpdateUser;