import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useGetUser from "./Hooks/useGetUser";
import DrawerContainer from "./Components/Drawer/DrawerContainer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import PersistLogin from "./Pages/Authentication/axios/Components/PersistLogin";
import FinancialRecommendations from "./Pages/Recommendations/FinancialRecommendations";
import NotificationsBase from "./Components/Notifications/NotificationsBase";
import Home from "./Pages/Home";
import Accounts from "./Pages/Accounts";
import Categories from "./Pages/Categories";
import Notifications from "./Pages/Notifications";
import Transactions from "./Pages/Transactions";

function App() {
  const { data } = useGetUser();

  return (
    <>
      {data ? (
        <BrowserRouter>
          <DrawerContainer>
            <NotificationsBase />
            <Routes>
              <Route element={<PersistLogin />}>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/recommendations" element={<FinancialRecommendations />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Login />} />
              </Route>
            </Routes>
          </DrawerContainer>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
