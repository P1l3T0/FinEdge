import { useEffect, useState } from 'react'
import Register from './Pages/Register'
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getCurrentUserEnddPoint } from './endpoints';

type User = {
  name: string;
  email: string;
  password: string
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // useEffect(() => {
  //   axios
  //     .get(`${getCurrentUserEnddPoint}`, { withCredentials: true })
  //     .then((res: AxiosResponse<User>) => {
  //       setCurrentUser(res.data);
  //     })
  //     .catch((err: AxiosError) => {
  //       console.log(`No user logged in  ${err.message}`);
  //     });
  // }, []);

  return (
    <>
      <Register setCurrentUser={setCurrentUser} />
    </>
  )
}

export default App
