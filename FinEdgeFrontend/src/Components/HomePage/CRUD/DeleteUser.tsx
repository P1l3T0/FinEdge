import { Button } from "@progress/kendo-react-buttons";
import useDeleteUser from "../../../Hooks/User/useDeleteUser";

const DeleteUser = () => {
  const { handleDelete } = useDeleteUser();

  return (
    <>
      <Button type="button" fillMode="solid" themeColor={"error"} onClick={handleDelete}>Delete</Button>
    </>
  );
};

export default DeleteUser;