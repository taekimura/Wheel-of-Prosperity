import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './Header.styles.scss';

import { selectCurrentUser } from '../../redux/user/user.selector';

const Header = () => <div className='header'></div>;

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
