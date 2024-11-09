import { Link } from "react-router-dom";

type User = {
  name: string;
  email: string;
  password: string
}

const Navbar = ({ user }: { user: User }) => {
  return (
    <>
      <div className="navbar">
        {user?.name !== undefined ? (
          <>
            <Link to="/home">Home</Link>
            {/* <Link to="/update">Update</Link> */}
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            {/* <Link to="/login">Login</Link> */}
          </>
        )}
      </div>
    </>
  )
}

export default Navbar;