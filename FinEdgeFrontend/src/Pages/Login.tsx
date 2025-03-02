import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxChangeEvent, InputSuffix } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import { envelopeIcon, passwordIcon } from "@progress/kendo-svg-icons";
import { loginEndPoint } from "../Utils/endpoints";
import { LoginDTO } from "../Utils/Types";
import CustomLink from "../Components/CustomLink";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<LoginDTO>({
    email: "",
    password: "",
  });

  const handleChange = async (e: TextBoxChangeEvent) => {
    const trimmedValue: string = (e.target.value as string).trim();

    setUser({
      ...user,
      [e.target.name as string]: trimmedValue,
    });
  };

  const loginUser = async () => {
    await axios
      .post<LoginDTO>(`${loginEndPoint}`, user, { withCredentials: true })
      .then(() => navigate("/home"))
      .catch((error: AxiosError) => {});
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError) => {
      alert(error.response?.data);
    },
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    mutateAsync();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 bg-white p-7 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          </div>

          <form onSubmit={onSubmit} method="post" autoComplete="off">
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="mb-2">
                  <TextBox id="email" type="email" name="email" placeholder="Email" onChange={handleChange} required={true}
                    prefix={() => (
                      <InputSuffix>
                        <SvgIcon icon={envelopeIcon} />
                      </InputSuffix>
                    )}
                  />
                </div>

                <div className="mb-2">
                  <TextBox id="password" type="password" name="password" placeholder="Password" onChange={handleChange} required={true}
                    prefix={() => (
                      <InputSuffix>
                        <SvgIcon icon={passwordIcon} />
                      </InputSuffix>
                    )}
                  />
                </div>
              </div>

              <div className="text-center">
                <Button id="login" themeColor={"primary"} type="submit" size={"large"} className="w-64 font-bold" >Login</Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Don't have an account?{" "}
                  <CustomLink to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Register
                  </CustomLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
