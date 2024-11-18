import { Card, CardHeader, CardBody, CardFooter } from "@progress/kendo-react-all";
import { Transaction } from "../../Utils/Types";
import DeleteTransaction from "./DeleteTransaction";

const TransactionCards = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <>
      {transactions?.map((transaction, index) => (
        <Card key={index}>
          <CardHeader>Category name: {transaction.name}</CardHeader>
          <CardBody>
            <fieldset>
              <legend> Details</legend>
              Amount: {transaction.amount} <br />
              Account Name: {transaction.accountName} <br />
              Category Name: {transaction.categoryName} <br />
              Created at: {
                new Date(transaction.dateCreated).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
            </fieldset>
          </CardBody>
          <CardFooter>
            {/* {/* <UpdateCategory category={category} /> */}
            <DeleteTransaction transaction={transaction} />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

export default TransactionCards;