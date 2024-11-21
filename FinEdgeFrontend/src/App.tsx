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

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/transactions" element={<Transactions />} />
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
