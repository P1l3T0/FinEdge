import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, SyntheticEvent, useEffect } from 'react'
import { registerEndPoint } from '../../endpoints';
import { Navigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxChangeEvent, } from "@progress/kendo-react-inputs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import "@progress/kendo-theme-default/dist/default-ocean-blue.css";
import Questions from '../Questions/Questions';
import { emailRegEx, getMethodologyString, passwordRegEx, User } from '../../Helpers/Helpers';
import MyStepper from '../../Components/Stepper';

const Register = ({ setCurrentUser }: { setCurrentUser: (user: User) => void }) => {
  const [emailError, setEmailError] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(true);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState<boolean>(true);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [stepperValue, setStepperValue] = useState<number>(0);
  const [user, setUser] = useState<User>({
    name: "",
    surname: "",
    email: "",
    password: "",
    methodologyType: ""
  });

  useEffect(() => {
    setIsNextButtonDisabled(emailError || passwordError);
  }, [emailError, passwordError]);

  const handleChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue: string = (e.target.value as string).trim();

    if (e.target.name === "email") {
      if (!emailRegEx.test(trimmedValue)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if (e.target.name === "password") {
      if (!passwordRegEx.test(trimmedValue)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }

    setUser({
      ...user,
      [(e.target.name as string)]: trimmedValue
    });
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    e.currentTarget.textContent == "Next" ? setStepperValue(1) : setStepperValue(0);
    setIsNextButtonClicked(!isNextButtonClicked);
  }

  const handleMethodologyChange = (value: string) => {
    setIsRegisterButtonDisabled(false);

    setUser({
      ...user,
      methodologyType: value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios
      .post(`${registerEndPoint}`, user, { withCredentials: true })
      .then((res: AxiosResponse<User>) => {
        res.data.methodologyType = getMethodologyString(parseInt(res.data.methodologyType));

        setCurrentUser(res.data);
        setShouldRedirect(true);
      })
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  if (shouldRedirect) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <MyStepper value={stepperValue} />

      <div className='register-form'>
        <form onSubmit={handleSubmit} method='post'>
          <div className="content" style={{ display: isNextButtonClicked ? "none" : "flex" }}>
            <TextBox id='name' type='text' name='name' placeholder="Name" onChange={handleChange} required={true} />
            <TextBox id='surname' type='text' name='surname' placeholder="Surname" onChange={handleChange} required={true} />
            <TextBox id='email' type='email' name='email' placeholder="Email" onChange={handleChange} required={true} />
            <Tooltip anchorElement="target" >
              <TextBox id='password' type='password' name='password' placeholder="Password" onChange={handleChange} required={true}
                title='Password needs to be at least 10 characters, have 1 upper/lower case letter, 1 number and 1 special symbol' />
            </Tooltip>

            <Button id='next' themeColor={'info'} disabled={isNextButtonDisabled} onClick={handleClick}>Next</Button>
          </div>
          <div className="questions" style={{ display: isNextButtonClicked ? "block" : "none" }}>
            <Questions onMethodologyChange={handleMethodologyChange} />

            <div className="buttonDiv">
              <Button id='backButton' themeColor={'error'} onClick={handleClick} >Back</Button>
              <Button id='registerButton' themeColor={'info'} disabled={isRegisterButtonDisabled} >Register</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register;