import { Link } from "react-router-dom";
import NotificationsBase from "./Notifications/NotificationsBas";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/recommendations">Recommendations</Link>
        <Link to="/logout">Log out</Link>
        <NotificationsBase />
      </div>
    </>
  )
}

export default Navbar;