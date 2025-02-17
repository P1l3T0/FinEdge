import Register from './Pages/Authentication/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Logout from './Pages/Authentication/Logout';
import Login from './Pages/Authentication/Login';
import Accounts from './Pages/Accounts/Accounts';
import Categories from './Pages/Categories/Categories';
import PersistLogin from './Pages/Authentication/axios/Components/PersistLogin';
import Transactions from './Pages/Transactions/Transactions';
import FinancialRecommendations from './Pages/Recommendations/FinancialRecommendations';
import useGetUser from './Hooks/useGetUser';

function App() {
  const { data } = useGetUser();

  return (
    <>
      <BrowserRouter >
        {data! && <Navbar />}
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/recommendations" element={<FinancialRecommendations />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
