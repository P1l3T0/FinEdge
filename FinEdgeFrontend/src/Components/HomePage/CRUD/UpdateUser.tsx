import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TextBox } from "@progress/kendo-react-inputs";
import { Window } from "@progress/kendo-react-dialogs";
import { User } from "../../../Utils/Types";
import { methodologyTypes } from "../../../Utils/Functions";
import useUpdateUser from "../../../Hooks/User/useUpdateUser";

const UpdateUser = ({ user }: { user: User }) => {
  const { visible, updatedUser, toggleDialog, handleTextBoxChange, handleDropDownChange, handleUpdate } = useUpdateUser(user);

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={"primary"} onClick={toggleDialog}>Update</Button>

      {visible && (
        <Window title="Update Profile" onClose={toggleDialog} initialHeight={440}>
          <form className="space-y-3">
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Name</label>
                <TextBox id="name" type="text" name="name" defaultValue={updatedUser.name} onChange={handleTextBoxChange} className="w-full" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Surname</label>
                <TextBox  id="surname" type="text" name="surname" defaultValue={updatedUser.surname} onChange={handleTextBoxChange} className="w-full" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Methodology Type</label>
                <DropDownList id="methodologyType" name="methodologyType" data={methodologyTypes} defaultValue={updatedUser.methodologyType} onChange={handleDropDownChange} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Email</label>
                <TextBox id="email" type="email" name="email" defaultValue={updatedUser.email} onChange={handleTextBoxChange} className="w-full" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">New Password</label>
                <TextBox id="password" type="password" name="password" defaultValue="" onChange={handleTextBoxChange} className="w-full" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5 border-t border-gray-200">
              <Button type="button" themeColor="primary" onClick={handleUpdate}>Save</Button>
              <Button type="button" themeColor="error" onClick={toggleDialog}>Cancel</Button>
            </div>
          </form>
        </Window>
      )}
    </>
  );
};

export default UpdateUser;