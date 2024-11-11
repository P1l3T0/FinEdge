import axios, { AxiosError, AxiosResponse } from 'axios';
import { SyntheticEvent, useState, } from 'react'
import { loginEndPoint } from '../../endpoints';
import { Navigate } from 'react-router-dom';
import { TextBox, TextBoxChangeEvent } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { getMethodologyString, LoginDto, User } from '../../Helpers/Helpers';
import CustomLink from '../../Components/CustomLink';

const Login = ({ setCurrentUser }: { setCurrentUser: (user: User) => void }) => {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [user, setUser] = useState<LoginDto>({
    email: "",
    password: ""
  });

  if (shouldRedirect) {
    return <Navigate to="/home" replace />;
  }

  const handleChange = async (e: TextBoxChangeEvent) => {
    const name: string = e.target.name as string;
    const value: string = e.target.value as string;
    const trimmedValue: string = value.trim();

    if (trimmedValue === "") {
      return;
    }

    setUser({
      ...user,
      [name]: trimmedValue
    });
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios
      .post(`${loginEndPoint}`, user, { withCredentials: true })
      .then((res: AxiosResponse<User>) => {
        res.data.methodologyType = getMethodologyString(parseInt(res.data.methodologyType));

        setCurrentUser(res.data);
        setShouldRedirect(true);
      }).catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  return (
    <>
      <form className='login-form' onSubmit={onSubmit} method='post'>
        <div className="content">
          <TextBox id='email' type='email' name='email' placeholder="Email" onChange={handleChange} required={true} />
          <TextBox id='password' type='password' name='password' placeholder="Password" onChange={handleChange} required={true} />

          <Button id='login' themeColor={'info'} type='submit'>Login</Button>
          <p style={{ padding: "1rem 0 0 0" }}>Don't have an account?‎ <CustomLink to='/register'>Register</CustomLink></p>
        </div>
      </form>
    </>
  )
}

export default Login;