import React, { useState } from "react";
import {Link} from 'react-router-dom';

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButton/CustomButton.component";

import { auth } from '../firebase/firebase_utils'

import "./SignIn.styles.scss";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = credentials;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({ email: "", password: "" });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials(prevState => {
      return {
        ...prevState,
        [name] : value
      }
    })
  };

  return (
    <div className="sign-in">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={credentials.email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={credentials.password}
          handleChange={handleChange}
          label="password"
          required
        />
        <CustomButton type="submit"> Sign in </CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
