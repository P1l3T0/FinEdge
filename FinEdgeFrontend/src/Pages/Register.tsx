import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, SyntheticEvent, useEffect } from 'react'
import { registerEndPoint } from '../endpoints';
import { Navigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxChangeEvent, } from "@progress/kendo-react-inputs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import "@progress/kendo-theme-default/dist/all.css";

const validEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$');

export type User = {
  name: string;
  surname: string;
  email: string;
  password: string
}

const Register = ({ setCurrentUser }: { setCurrentUser: (user: User) => void }) => {
  const [emailError, setEmailError] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: "",
    surname: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    setIsButtonDisabled(emailError || passwordError);
  }, [emailError, passwordError]);

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

    if (name === "email") {
      if (!validEmail.test(trimmedValue)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if (name === "password") {
      if (!validPassword.test(trimmedValue)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }

    setUser({
      ...user,
      [name]: trimmedValue
    });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    debugger
    await axios
      .post(`${registerEndPoint}`, user, { withCredentials: true })
      .then((res: AxiosResponse<User>) => {
        setCurrentUser(res.data);
        setShouldRedirect(true);
      })
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  return (
    <>
      <form className='register-form' onSubmit={handleSubmit} method='post'>
        <div className="content">
          <TextBox id='name' type='text' name='name' placeholder="Name" onChange={handleChange} required={true} />
          <TextBox id='surname' type='text' name='surname' placeholder="Surname" onChange={handleChange} required={true} />
          <TextBox id='email' type='email' name='email' placeholder="Email" onChange={handleChange} required={true} />
          <Tooltip anchorElement="target" >
            <TextBox id='password' type='password' name='password' placeholder="Password" onChange={handleChange} required={true}
              title='Password needs to be at least 10 characters, have 1 upper/lower case letter, 1 number and 1 special symbol' />
          </Tooltip>

          <Button id='register' themeColor={'info'} disabled={isButtonDisabled}>Register</Button>
        </div>
      </form>
    </>
  )
}

export default Register;