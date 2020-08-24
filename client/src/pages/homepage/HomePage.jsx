import React, { useState } from "react";
import {Link} from 'react-router-dom'

import FormInput from "../../components/FormInput/FormInput.component";
import CustomButton from "../../components/CustomButton/CustomButton.component";

import { auth, createUserProfileDocument } from "../../components/firebase/firebase_utils";

import "./HomePage.scss";

const HomePage = () => {
  const [userState, setUserState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = userState;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setUserState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserState(prevState => {
        return {
          ...prevState,
          [name]: value
        }
      })
  };

  const { displayName, email, password, confirmPassword } = userState;
  return (
      <div className="homepage">
    <div className="sign-up">
      <h2 className="title">Don't have an account yet?</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
        <span className="sign-in-block">Already have an account? <Link to="/signin">Login here</Link></span>
      </form>
    </div>
    </div>
  );
};

export default HomePage;
