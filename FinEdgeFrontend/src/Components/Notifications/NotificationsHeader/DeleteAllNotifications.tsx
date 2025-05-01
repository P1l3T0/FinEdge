import useDeleteAllNotifications from "../../../Hooks/Notifications/useDeleteAllNotifications";

const DeleteAllNotifications = () => {
  const { handleDeleteAll } = useDeleteAllNotifications();

  return (
    <>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition" onClick={handleDeleteAll}>
        Delete All
      </button>
    </>
  );
};

export default DeleteAllNotifications;
