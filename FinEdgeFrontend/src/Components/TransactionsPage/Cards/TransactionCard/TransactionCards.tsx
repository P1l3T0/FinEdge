import { Transaction } from "../../../../Utils/Types";
import TransactionCardFooter from "./TransactionCardFooter";
import TransactionCardBody from "./TransactionCardBody";
import TransactionCardHeader from "./TransactionCardHeader";
import { Card, CardHeader, CardBody, CardFooter } from "@progress/kendo-react-layout";

const TransactionCards = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <>
      {transactions?.map((transaction, index) => (
        <Card key={index} className="shadow-md hover:shadow-xl duration-300 ease-in-out">
          <CardHeader>
            <TransactionCardHeader transaction={transaction} />
          </CardHeader>
          <CardBody>
            <TransactionCardBody transaction={transaction} />
          </CardBody>
          <CardFooter>
            <TransactionCardFooter transaction={transaction} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default TransactionCards;