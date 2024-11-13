import { User } from "../Utils/Types";
import GetAccounts from "./Accounts/GetAccounts";

const Home = ({ user }: { user: User, }) => {


  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Methodology</th>
          </tr>
          <tr>
            <td>{user?.name}</td>
            <td>{user?.surname}</td>
            <td>{user?.email}</td>
            <td>{user?.methodologyType}</td>
          </tr>
        </tbody>
      </table>

      <h2>Accounts</h2>
      <GetAccounts />
    </>
  )
}

export default Home;