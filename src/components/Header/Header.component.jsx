import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../firebase/firebase_utils';

import './Header.styles.scss';

import { selectCurrentUser } from '../../redux/user/user.selector';

const Header = ({ currentUser }) => {
  const { t } = useTranslation();
  let location = useLocation();

  return (
    <div className='admin-header'>
      <div>
        {t('Hi')}, <b>{currentUser.displayName}</b>. &nbsp;
        {currentUser.role === 'admin' ? (
          location.pathname === '/admin' ? (
            <Link to='/' className='admin-link'>
              Go to Quiz
            </Link>
          ) : (
            <Link to='/admin' className='admin-link'>
              Go to admin dashboard
            </Link>
          )
        ) : null}
      </div>

      <div className='options'>
        {currentUser && (
          <div className='option' onClick={() => auth.signOut()}>
            {t('Sign out')}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
