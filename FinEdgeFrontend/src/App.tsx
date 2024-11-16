import Register from './Pages/Authentication/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Logout from './Pages/Authentication/Logout';
import Login from './Pages/Authentication/Login';
import Accounts from './Pages/Accounts/Accounts';
import Categories from './Pages/Categories/Categories';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
