import { useState } from "react";
import {validateUser } from "../../services/apiservice";
import InputField from "../inputFeilds/inputField";
import toastr from "toastr";

function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: userName, 
      password: userPassword,
    };

    validateUser(data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token",res.data)
        toastr.success("Login Successful!");
      })
      .catch((err) => {
        console.error(err);
        toastr.error("Login Failed. Please check your credentials.");
      });
  };

  return (
    <>
      <h1>Hi Login, Kindly login !!</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username/Email"
            placeholder="Enter username or email"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            type="password"
            name="userPassword"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;