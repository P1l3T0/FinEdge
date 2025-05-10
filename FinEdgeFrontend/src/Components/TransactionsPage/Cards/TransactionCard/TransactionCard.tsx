import { Transaction } from "../../../../Utils/Types";
import TransactionCardFooter from "./TransactionCardFooter";
import TransactionCardBody from "./TransactionCardBody";
import TransactionCardHeader from "./TransactionCardHeader";
import { Card, CardHeader, CardBody, CardFooter } from "@progress/kendo-react-layout";
import { ListViewItemProps } from "@progress/kendo-react-listview";

const TransactionCard = (props: ListViewItemProps) => {
  const transaction: Transaction = props.dataItem;

  return (
    <>
      <div className="m-4">
        <Card key={transaction.id} className="shadow-md hover:shadow-xl duration-300 ease-in-out w-70 h-90">
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
      </div>
    </>
  );
}

export default TransactionCard;