import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import './Header.styles.scss';

// import Logo from '../../assets/logo.png';
import {auth} from '../firebase/firebase_utils';
import {selectCurrentUser} from '../../redux/user/user.selector'

const Header = ({currentUser}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      {/* <img src={Logo} alt='logo'  className='logo' /> */}
      WHEEL OF PROSPERITY
    </Link>
    <div className='options'>

      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
