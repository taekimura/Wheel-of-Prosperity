import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../../components/FormInput/FormInput.component';
import CustomButton from '../../components/CustomButton/CustomButton.component';
import { setCurrentUser } from '../../redux/user/user.action';

import './HomePage.scss';

const HomePage = ({ setCurrentUser }) => {
  const [userState, setUserState] = useState({
    displayName: '',
    email: '',
    role: 'user'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCurrentUser(userState);
    setUserState({
      displayName: '',
      email: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserState((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const { displayName, email } = userState;
  return (
    <div className='homepage'>
      <div className='sign-up'>
        <h2 className='title'>Welcome!</h2>
        <span className='content'>Sign in with your username and email</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            label='Email'
            required
          />
          <CustomButton type='submit'>SIGN IN</CustomButton>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(HomePage);
