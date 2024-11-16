import { Card, CardHeader, CardBody, CardFooter } from "@progress/kendo-react-all";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { getExpenditureCategoriesEndPoint } from "../../endpoints";
import { CategoryResponse } from "../../Utils/Types";
import DeleteCategory from "./DeleteCategory";

const GetIncomeCategories = () => {
  const getCategories = async () => {
    return await axios
      .get<CategoryResponse>(`${getExpenditureCategoriesEndPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<CategoryResponse>) => res.data)
      .catch((err: AxiosError) => {
        throw new Error(`No categories found ${err.message}`);
      });
  };

  const incomeCategoriesQuery = useQuery({
    queryKey: ["income-category"],
    queryFn: getCategories
  })

  const { data, isLoading, isError, error } = incomeCategoriesQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="account-cards">
        Total expenditure categories balance: {data?.totalBalance} <br />
        Total expenditure categories budget: {data?.totalBudget} <br />

        {data?.categories.map((category, index) => (
          <Card key={index}>
            <CardHeader>Category name: {category.name}</CardHeader>
            <CardBody>
              Balance: {category.balance} {category.currency} <br />
              Budget: {category.budget} {category.currency} <br />
              Income: {category.isIncome.toString()} <br />
              Created at: {
                new Date(category.dateCreated).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
            </CardBody>
            <CardFooter>
              {/* <UpdateAccount account={account} /> */}
              <DeleteCategory category={category} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default GetIncomeCategories;