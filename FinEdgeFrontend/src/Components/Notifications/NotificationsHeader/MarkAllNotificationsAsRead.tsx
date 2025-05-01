import useMarkAllNotificationsAsRead from "../../../Hooks/Notifications/useMarkAllNotificationsAsRead";

const MarkAllNotificationsAsRead = () => {
  const { handleMarkAllAsRead } = useMarkAllNotificationsAsRead();

  return (
    <>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" type="button" onClick={handleMarkAllAsRead}>
        Mark All Read
      </button>
    </>
  );
};

export default MarkAllNotificationsAsRead;