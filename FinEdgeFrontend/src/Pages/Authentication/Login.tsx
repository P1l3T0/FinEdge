import axios, { AxiosError } from 'axios';
import { SyntheticEvent, useState, } from 'react'
import { loginEndPoint } from '../../endpoints';
import { useNavigate } from 'react-router-dom';
import { TextBox, TextBoxChangeEvent } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { LoginDto, User } from '../../Utils/Types';
import CustomLink from '../../Components/CustomLink';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<LoginDto>({
    email: "",
    password: ""
  });

  const handleChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue: string = (e.target.value as string).trim();

    setUser({
      ...user,
      [(e.target.name as string)]: trimmedValue
    });
  };

  const loginUser = async () => {
    await axios
      .post<User>(`${loginEndPoint}`, user, { withCredentials: true })
      .then(() => navigate("/home"))
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      });;
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError) => {
      alert(error.response?.data);
    }
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    mutateAsync();
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