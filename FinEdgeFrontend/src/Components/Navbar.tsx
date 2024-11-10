import { Link } from "react-router-dom";
import { User } from "../Helpers/Helpers";

const Navbar = ({ user }: { user: User }) => {
  return (
    <>
      <div className="navbar">
        {user !== undefined ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </>
  )
}

export default Navbar;