import { useState } from "react";
import { validateUser } from "../../services/apiservice";
import InputField from "../inputFeilds/inputField";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: userName,
      password: userPassword,
    };

    validateUser(data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken",JSON.stringify(res.data.token));
        toastr.success("Login Successful!");
        navigate("/");
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error ||
          "Login Failed. Please check your credentials.";
        if (errorMessage === "Invalid password")
          toastr.error("Invalid password");
        else if (errorMessage === "Username / email doesn't exists")
          toastr.error("Username / email doesn't exists");
        else toastr.error(errorMessage);
      });
  };

  const navigateToRegister = () => {
    return navigate("/register");
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="signupForm">
            <div className="signUp">
              <h4 className="title">Sign in</h4>
            </div>
            <div className="formInput">
              <InputField
                label="Username/Email"
                placeholder="Enter username or email"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="formInput">
              <InputField
                label="Password"
                placeholder="Enter password"
                type="password"
                name="userPassword"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="signInbutton" disabled={!userName || !userPassword}>
                Submit
              </button>
            </div>
            <div className="signIn">
              <div>
                Are you a new user?{" "}
                <span onClick={navigateToRegister}>Sign up</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
