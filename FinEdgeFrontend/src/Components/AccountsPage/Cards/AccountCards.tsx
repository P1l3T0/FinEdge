import { Card, CardBody, CardFooter, CardHeader } from '@progress/kendo-react-all';
import { Account } from '../../../Utils/Types';
import AccountCardBody from './AccountCards/AccountCardBody';
import AccountCardFooter from './AccountCards/AccountCardFooter';
import AccountCardHeader from './AccountCards/AccountCardHeader';

const AccountCards = ({accounts} : {accounts: Account[]}) => {
  return (
    <>
      {accounts?.map((account, index) => (
        <Card key={index} className="shadow-md hover:shadow-xl duration-300 ease-in-out">
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
      ))}
    </>
  );
}

export default AccountCards;