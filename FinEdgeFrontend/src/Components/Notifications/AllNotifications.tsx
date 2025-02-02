import useGetNotifications from "../../Hooks/useGetNotifications";

const AllNotifications = () => {
  const { data, error, isError, isLoading } = useGetNotifications();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <div>🔔 Notifications ({data?.length || 0})</div>
    </>
  );
};

export default AllNotifications;
