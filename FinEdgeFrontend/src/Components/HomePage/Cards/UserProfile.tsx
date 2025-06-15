import UpdateUser from "../CRUD/UpdateUser";
import { getEnumValueFromNumber } from "../../../Utils/Functions";
import { MethodologyType, User } from "../../../Utils/Types";
import DashboardCard from "./DashboardCard";

const UserProfile = ({user}: {user: User}) => {
  return (
    <>
      <DashboardCard className="hover:shadow-lg transition-shadow">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold"> Welcome, {user?.name}</h1>
          <p>{user?.email}</p>
          <p>Member since{" "} {user!.dateCreated.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>Methodology:{" "} {getEnumValueFromNumber(parseInt(user!.methodologyType), MethodologyType)}</p>
        </div>
        <UpdateUser user={user!} />
      </DashboardCard>
    </>
  );
};

export default UserProfile;