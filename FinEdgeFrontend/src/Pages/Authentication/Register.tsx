import axios, { AxiosError } from 'axios';
import { useState, SyntheticEvent, useEffect } from 'react'
import { registerEndPoint } from '../../endpoints';
import { useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxChangeEvent, } from "@progress/kendo-react-inputs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import "@progress/kendo-theme-default/dist/default-ocean-blue.css";
import Questions from '../Questions/Questions';
import { RegisterDto } from '../../Utils/Types';
import CustomLink from '../../Components/CustomLink';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isValidPassword, isValidEmail } from '../../Utils/Functions';

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const emailRegEx = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$');

  const [emailError, setEmailError] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(true);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<RegisterDto>({
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
      setEmailError(!isValidEmail(trimmedValue, emailRegEx));
    } else if (e.target.name === "password") {
      setPasswordError(!isValidPassword(trimmedValue, passwordRegEx));
    }

    setUser({
      ...user,
      [(e.target.name as string)]: trimmedValue
    });
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsNextButtonClicked(!isNextButtonClicked);
  }

  const handleMethodologyChange = (value: string) => {
    setIsRegisterButtonDisabled(false);

    setUser({
      ...user,
      methodologyType: value,
    });
  };

  const registerUser = async () => {
    await axios
      .post<RegisterDto>(`${registerEndPoint}`, user, { withCredentials: true })
      .then(() => navigate("/home"))
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });
  }

  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    mutateAsync();
  }

  return (
    <>
      <div className='register-form'>
        <form onSubmit={handleSubmit} method='post' autoComplete='off'>
          <div className="content" style={{ display: isNextButtonClicked ? "none" : "flex" }}>
            <TextBox id='name' type='text' name='name' placeholder="Name" onChange={handleChange} required={true} />
            <TextBox id='surname' type='text' name='surname' placeholder="Surname" onChange={handleChange} required={true} />
            <TextBox id='email' type='email' name='email' placeholder="Email" onChange={handleChange} required={true} />
            <Tooltip anchorElement="target" >
              <TextBox id='password' type='password' name='password' placeholder="Password" onChange={handleChange} required={true}
                title='Password needs to be at least 10 characters, have 1 upper/lower case letter, 1 number and 1 special symbol' />
            </Tooltip>

            <Button id='next' themeColor={'info'} disabled={isNextButtonDisabled} onClick={handleClick}>Next</Button>
            <div style={{ padding: "1rem 0 0 0", textAlign: "center" }}>
              <p>Have an account? ‎<CustomLink to='/login'>Log in here</CustomLink></p>
            </div>
          </div>
          <div className="questions" style={{ display: isNextButtonClicked ? "block" : "none" }}>
            <div className='questionsForm'>
              <Questions onMethodologyChange={handleMethodologyChange} />
            </div>

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