import React, { useState } from "react";
import InputField from "../inputFeilds/inputField";
import { passwordPattern, userEmailPattern } from "../../regex/regex";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../services/apiservice";
import toastr from "toastr"; // Removed destructuring
import  "./register.css";
function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "Firstname is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Lastname is required";
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!userEmailPattern.test(formData.email)) {
      newErrors.email = "Invalid email Address";
    }
    if (formData.password.length <= 8 ) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      createUser(formData);
    }
  };

  const createUser = async (formData) => {
    try {
      const response = await saveUser(formData);
      console.log(response.data);
      toastr.success("User saved successfully");
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      if (errorMessage === "Username / email already exists") {
        toastr.error("Username / email already exists");
      } else {
        toastr.error(errorMessage);
      }
    }
  };
  const navigateToLogin=()=>{
   return navigate('/login');
  }
  return (
    <>
      <div className="container">
      <div className="registerForm">
        <div className="box1">
        <form onSubmit={handleSubmit}>
      <div className="form">
      <div className="signUp"><h4 className="title">Sign up</h4></div>
        <div className="formDivBox1">
          <div>
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
          </div>
          <div>
            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div></div>
          <div className="formDivBox2">
            <div>
            <InputField
              label="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          <div>
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
          </div></div>
         <div className="formDivBox3">
          <div>
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>
          <div>
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div></div>
          <div className="btn">
          <button type="submit">Register</button>
          </div>
        </div>
        </form>
        <div>
          <img className="formImg" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt="img.jpg"/>
        </div></div>
      <div className="signIn">
      <div>Already having a account <span onClick={navigateToLogin}>Sign in</span></div>
      </div>
      </div>
       </div>
    </>
  );
}

export default Register;
