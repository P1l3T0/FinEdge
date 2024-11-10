import { User } from "../Helpers/Helpers";

const Home = ({ user }: { user: User }) => {
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
    </>
  )
}

export default Home;