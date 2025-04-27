import { TextBox, InputSuffix } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { envelopeIcon, passwordIcon } from "@progress/kendo-svg-icons";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/Auth/useLogin";

const Login = () => {
  const { handleChange, onSubmit } = useLogin();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="space-y-8 bg-white p-7 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          </div>
          <form onSubmit={onSubmit} method="post" autoComplete="off">
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="mb-2">
                  <TextBox id="email" type="email" name="email" placeholder="Email" onChange={handleChange} required={true} prefix={() => (
                      <InputSuffix>
                        <SvgIcon icon={envelopeIcon} />
                      </InputSuffix>
                    )}
                  />
                </div>
                <div className="mb-2">
                  <TextBox id="password" type="password" name="password" placeholder="Password" onChange={handleChange} required={true} prefix={() => (
                      <InputSuffix>
                        <SvgIcon icon={passwordIcon} />
                      </InputSuffix>
                    )}
                  />
                </div>
              </div>
              <div className="text-center">
                <Button id="login" themeColor={"primary"} type="submit" size={"large"} className="w-64 font-bold">Login</Button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Don't have an account?{" "} <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium"> Register</Link>
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
