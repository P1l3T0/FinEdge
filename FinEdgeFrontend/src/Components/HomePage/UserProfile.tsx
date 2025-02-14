import DeleteUser from "../../Data/User/DeleteUser";
import UpdateUser from "../../Data/User/UpdateUser";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import { MethodologyType, User } from "../../Utils/Types";
import DashboardCard from "./DashboardCard";

const UserProfile = ({ user }: {user: User}) => (
  <DashboardCard className="hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">
          Member since{" "}
          {new Date(user.dateCreated).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-500">
          Methodology:{" "}
          {getEnumValueFromNumber(parseInt(user.methodologyType), MethodologyType)}
        </p>
      </div>
      <div className="flex gap-2">
        <UpdateUser user={user} />
        <DeleteUser />
      </div>
    </div>
  </DashboardCard>
);

export default UserProfile;