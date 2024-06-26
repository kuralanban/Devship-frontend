import { useState } from "react";
import InputField from "../inputFeilds/inputField";
import { passwordPattern, userEmailPattern } from "../../regex/regex";
import axios from "axios";
import { saveUser } from "../../services/apiservice";
import { toastr } from "toastr";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    const newError = {};
    if (!formData.firstName) {
      newError.firstName = "Firstname is required";
    }
    if (!formData.lastName) {
      newError.lastName = "Lastname is required";
    }
    if (!userEmailPattern.test(formData.email)) {
      newError.email = "Invalid email Address";
    }
    if (formData.password.length <= 8) {
      newError.password = "Password must be atleast 8 charecters";
    }
    if (formData.password != formData.confirmPassword) {
      newError.confirmPassword = "Password do not match";
    }
    setErrors(newError);
    if (Object.keys(newError).length == 0) {
      console.log(formData);
      createUser(formData)
    }
  };
 const createUser= async(formData)=>{
   await saveUser(formData)
        .then((data) => {
            console.log(data)
          toastr.success("User saved Successfully");
        })
        .catch((e) => {
          console.error(e)
          if(e=="Username / email already exists") toastr.error("User already exists"); else toastr.error("Somthing went wrong");
        });
  }
  return (
    <>
      <div className="registerForm">
        <div>
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            // value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
        </div>
        <div>
          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            // value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>
        <div>
          <InputField
            label="email"
            type="text"
            name="email"
            // value={formData.firstName}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div>
          <InputField
            label="username"
            type="text"
            name="username"
            // value={formData.firstName}
            onChange={handleChange}
            error={errors.username}
          />
        </div>
        <div>
          <InputField
            label="password"
            type="text"
            name="password"
            // value={formData.firstName}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <div>
          <InputField
            label="confirmPassword"
            type="text"
            name="confirmPassword"
            // value={formData.firstName}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>
        <div></div>
        <button onClick={handlSubmit}>Submit</button>
      </div>
    </>
  );
}
export default Register;
