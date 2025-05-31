import { Card, CardBody, CardFooter, CardHeader } from '@progress/kendo-react-layout';
import { Account } from '../../../Utils/Types';
import AccountCardBody from './AccountCards/AccountCardBody';
import AccountCardFooter from './AccountCards/AccountCardFooter';
import AccountCardHeader from './AccountCards/AccountCardHeader';
import { ListViewItemProps } from '@progress/kendo-react-listview';

const AccountCard = (props: ListViewItemProps) => {
  const account: Account = props.dataItem;

  return (
    <>
      <div className="m-2">
        <Card key={account.id} className="shadow-md hover:shadow-xl duration-300 ease-in-out w-70 h-65">
          <CardHeader>
            <AccountCardHeader account={account} />
          </CardHeader>
          <CardBody>
            <AccountCardBody account={account} />
          </CardBody>
          <CardFooter>
            <AccountCardFooter account={account} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default AccountCard;