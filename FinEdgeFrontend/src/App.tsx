import Register from './Pages/Authentication/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Logout from './Pages/Authentication/Logout';
import Login from './Pages/Authentication/Login';
import CreateAccounts from './Pages/Accounts/CreateAccounts';
import GetAccounts from './Pages/Accounts/GetAccounts';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/accounts" element={<CreateAccounts />} />
          <Route path="/accounts/get" element={<GetAccounts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
