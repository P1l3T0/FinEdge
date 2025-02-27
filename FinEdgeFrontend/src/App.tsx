import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import useGetUser from "./Hooks/Auth/useGetUser";
import DrawerContainer from "./Components/Navigation/DrawerContainer";
import BottomNavigationContainer from "./Components/Navigation/BottomNavigationContainer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import FinancialRecommendations from "./Pages/Recommendations/FinancialRecommendations";
import NotificationsBase from "./Components/Notifications/NotificationsBase";
import Home from "./Pages/Home";
import Accounts from "./Pages/Accounts";
import Categories from "./Pages/Categories";
import Notifications from "./Pages/Notifications";
import Transactions from "./Pages/Transactions";
import PersistLogin from "./Components/Axios/Components/PersistLogin";

function App() {
  const { data } = useGetUser();

  return (
    <>
      {data ? (
        <BrowserRouter>
          <BrowserView>
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
          </BrowserView>
          <MobileView>
            <BottomNavigationContainer>
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
            </BottomNavigationContainer>
          </MobileView>
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