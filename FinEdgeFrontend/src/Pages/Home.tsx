import GetUser from "../User/GetUser";
import CreateAccounts from "./Accounts/CreateAccounts";
import GetAccounts from "./Accounts/GetAccounts";

const Home = () => {


  return (
    <>
      <h2> User</h2 >
      <GetUser />

      <h2>Accounts</h2>
      <GetAccounts />
      <br />
      <CreateAccounts />
    </>
  )
}

export default Home;