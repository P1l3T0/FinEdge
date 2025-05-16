import DeleteUser from "../CRUD/DeleteUser";
import UpdateUser from "../CRUD/UpdateUser";
import { getEnumValueFromNumber } from "../../../Utils/Functions";
import { MethodologyType } from "../../../Utils/Types";
import DashboardCard from "./DashboardCard";
import useGetUser from "../../../Hooks/Auth/useGetUser";

const UserProfile = () => {
  const { data } = useGetUser();

  return (
    <>
      <DashboardCard className="hover:shadow-lg transition-shadow">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold"> Welcome, {data?.name}</h1>
          <p>{data?.email}</p>
          <p>
            Member since{" "}
            {data!.dateCreated.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>Methodology:{" "} {getEnumValueFromNumber(parseInt(data!.methodologyType), MethodologyType)}</p>
        </div>
        <div className="flex gap-2">
          <UpdateUser user={data!} />
          <DeleteUser />
        </div>
      </DashboardCard>
    </>
  );
};

export default UserProfile;