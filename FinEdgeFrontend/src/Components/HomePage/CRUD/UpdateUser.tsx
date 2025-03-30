import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { updateCurrentUserEnddPoint } from "../../../Utils/endpoints";
import { MethodologyType, UpdateDTO, User } from "../../../Utils/Types";
import { getEnumValueFromNumber, methodologyTypes } from "../../../Utils/Functions";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownListChangeEvent, DropDownList } from "@progress/kendo-react-dropdowns";
import { TextBoxChangeEvent, TextBox } from "@progress/kendo-react-inputs";
import { Window } from "@progress/kendo-react-dialogs";

const UpdateUser = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<UpdateDTO>({
    name: user.name,
    surname: user.surname,
    methodologyType: getEnumValueFromNumber(parseInt(user.methodologyType), MethodologyType),
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

  const handleDropDownChange = async (e: DropDownListChangeEvent) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.props.name as string]: e.value,
    });
  }

  const updateUser = async () => {
    await axios
      .put<UpdateDTO>(`${updateCurrentUserEnddPoint}/${user.id}`, updatedUser, { withCredentials: true })
      .then(() => setUpdatedUser({
        ...updatedUser,
        password: ""
      }))
      .catch((error: AxiosError) => {});
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
      <Button type="button" fillMode="solid" themeColor={"primary"} onClick={toggleDialog} > 
        Update
      </Button>

      {visible && (
        <Window title="Update Profile" onClose={toggleDialog} initialHeight={440}> 
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Name</label>
                <TextBox id="name" type="text" name="name" defaultValue={user.name} onChange={handleTextBoxChange} className="w-full" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Surname
                </label>
                <TextBox id="surname" type="text" name="surname" defaultValue={user.surname} onChange={handleTextBoxChange} className="w-full" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Methodology Type</label>
                <DropDownList id="methodologyType" name="methodologyType" data={methodologyTypes} defaultValue={getEnumValueFromNumber(parseInt(user.methodologyType), MethodologyType)} onChange={handleDropDownChange} />
                </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Email
                </label>
                <TextBox id="email" type="email" name="email" defaultValue={user.email} onChange={handleTextBoxChange} className="w-full" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  New Password
                </label>
                <TextBox id="password" type="password" name="password" defaultValue="" onChange={handleTextBoxChange} className="w-full" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button type="button" themeColor="error" onClick={toggleDialog}>
                Cancel
              </Button>
            </div>
          </form>
        </Window>
      )}
    </>
  );
}

export default UpdateUser;