import { TextBox, InputSuffix } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { envelopeIcon, userIcon, passwordIcon } from "@progress/kendo-svg-icons";
import { Link } from "react-router-dom";
import Questions from "../Components/HomePage/Questions";
import useRegister from "../Hooks/Auth/useRegister";

const Register = () => {
  const { isNextButtonDisabled, isNextButtonClicked, isRegisterButtonDisabled, handleChange, handleClick, handleMethodologyChange, handleSubmit } = useRegister();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 bg-white p-7 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isNextButtonClicked ? "Answer the questions" : "Create Account"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} method="post" autoComplete="off">
            <div className={`space-y-6 ${isNextButtonClicked ? "hidden" : "block"}`}>
              <div className="space-y-6">
                <div className="mb-2">
                  <TextBox id="name" type="text" name="name" placeholder="Name" onChange={handleChange} required={true}
                    prefix={() => (
                      <InputSuffix>
                        <SvgIcon icon={userIcon} />
                      </InputSuffix>
                    )}
                  />
                </div>
                <div className="mb-2">
                  <TextBox id="surname" type="text" name="surname" placeholder="Surname" onChange={handleChange} required={true}
                    prefix={() => (
                      <InputSuffix>
                        <SvgIcon icon={userIcon} />
                      </InputSuffix>
                    )}
                  />
                </div>
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
                  <Tooltip anchorElement="target">
                    <TextBox id="password" type="password" name="password" placeholder="Password" onChange={handleChange} required={true} 
                      title="Password needs to be at least 10 characters, have 1 upper/lower case letter, 1 number and 1 special symbol"
                      prefix={() => (
                        <InputSuffix>
                          <SvgIcon icon={passwordIcon} />
                        </InputSuffix>
                      )}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="text-center">
                <Button id="next" themeColor={"primary"} disabled={isNextButtonDisabled} onClick={handleClick} size={"large"} className="w-64 font-bold text-2xl">
                  Next
                </Button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
            <div
              className={`${isNextButtonClicked ? "block" : "hidden"} space-y-8`}>
              <div className="bg-blue-100 text-black px-5 py-3 rounded-lg">
                <Questions onMethodologyChange={handleMethodologyChange} />
              </div>
              <div className="flex space-x-3 justify-center">
                <Button id="backButton" className="w-48 font-bold" themeColor={"error"} size={"large"} onClick={handleClick}>Back</Button>
                <Button id="registerButton" className="w-48 font-bold" themeColor={"primary"} size={"large"} disabled={isRegisterButtonDisabled}>Register</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
