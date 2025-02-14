import { AccountType } from "../../Utils/Types";
import { Card, CardBody, CardHeader, CardFooter, } from "@progress/kendo-react-all";
import { getEnumValueFromNumber } from "../../Utils/Functions";
import DeleteAccount from "./DeleteAccount";
import UpdateAccount from "./UpdateAccount";
import useGetAccounts from "../../Hooks/Accounts/useGetAccounts";

const GetAccounts = () => {
  const { data, isLoading, isError, error } = useGetAccounts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error!.message}</p>;

  return (
    <>
      {data?.map((account, index) => (
        <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {account.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {getEnumValueFromNumber(parseInt(account.accountType), AccountType)}
                </span>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {account.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Balance</span>
                <span className="text-xl font-bold">
                  {account.balance} {account.currency}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Created</span>
                <span className="text-sm text-gray-500">
                  {new Date(account.dateCreated).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="border-t border-gray-200 p-4">
            <div className="flex justify-end gap-2">
              <UpdateAccount account={account} />
              <DeleteAccount account={account} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default GetAccounts;
