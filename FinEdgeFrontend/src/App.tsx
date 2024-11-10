import { useEffect, useState } from 'react'
import Register from './Pages/Authentication/Register'
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getCurrentUserEnddPoint } from './endpoints';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Logout from './Pages/Authentication/Logout';
import Login from './Pages/Authentication/Login';
import { getMethodologyString, User } from './Helpers/Helpers';

function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    axios
      .get(`${getCurrentUserEnddPoint}`, { withCredentials: true })
      .then((res: AxiosResponse<User>) => {
        res.data.methodologyType = getMethodologyString(parseInt(res.data.methodologyType));

        setCurrentUser(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(`No user logged in  ${err.message}`);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar user={currentUser as User} />
        <Routes>
          <Route path="/home" element={<Home user={currentUser as User} />} />
          {/* <Route path="/update" element={<Update user={currentUser as User} setCurrentUser={setCurrentUser} />} /> */}
          <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/logout" element={<Logout setCurrentUser={setCurrentUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
