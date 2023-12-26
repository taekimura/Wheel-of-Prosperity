import React from 'react';
import { connect } from 'react-redux';
import {
  auth,
  googleAuthProvider
} from '../../components/firebase/firebase_utils';
import Google from './google.svg';
import CustomButton from '../../components/CustomButton/CustomButton.component';
import { setCurrentUser } from '../../redux/user/user.action';

import './HomePage.scss';

const HomePage = ({ setCurrentUser }) => {
  const loginWithGoogleAccount = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      if (user) {
        setCurrentUser({
          type: 'SET_CURRENT_USER',
          payload: {
            displayName: user.displayName,
            email: user.email
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='homepage'>
      <div className='sign-up'>
        <h2 className='title'>Welcome!</h2>
        <CustomButton
          onClick={loginWithGoogleAccount}
          style={{
            background: 'white',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={Google}
            alt='google-icon'
            width='16px'
            height='16px'
            style={{ marginRight: '10px' }}
          />
          Sign in with Google account
        </CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(HomePage);
