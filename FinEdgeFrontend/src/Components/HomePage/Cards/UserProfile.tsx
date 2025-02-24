import DeleteUser from "../CRUD/DeleteUser";
import UpdateUser from "../CRUD/UpdateUser";
import { getEnumValueFromNumber } from "../../../Utils/Functions";
import { MethodologyType } from "../../../Utils/Types";
import DashboardCard from "./DashboardCard";
import useGetUser from "../../../Hooks/Auth/useGetUser";

const UserProfile = () => {
  const { data, isLoading, isError, error } = useGetUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      <DashboardCard className="hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {data?.name}</h1>
            <p className="text-gray-600">{data?.email}</p>
            <p className="text-sm text-gray-500">
              Member since{" "}
              {new Date(data!.dateCreated).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-500">Methodology:{" "}
              {getEnumValueFromNumber(parseInt(data!.methodologyType), MethodologyType)}
            </p>
          </div>
          <div className="flex gap-2">
            <UpdateUser user={data!} />
            <DeleteUser />
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default UserProfile;