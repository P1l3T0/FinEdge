import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/logout">Log out</Link>
      </div>
    </>
  )
}

export default Navbar;