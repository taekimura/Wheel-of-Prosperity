import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import HomePage from './pages/homepage/HomePage';
import WheelPage from './pages/wheel/WheelPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import Header from './components/Header/Header.component';
import Dashboard from './components/Dashboard/Dashboard.component';
import {
  auth,
  createUserProfileDocument
} from './components/firebase/firebase_utils';
import { selectCurrentUser } from './redux/user/user.selector';
import { setCurrentUser } from './redux/user/user.action';
import Loading from './components/Loading/Loading';
import './i18n';

function App({ setCurrentUser, currentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  let location = useLocation();

  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
        setIsLoading(false);
      } else {
        setCurrentUser(userAuth);
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

  if (isLoading) return <Loading />;

  return (
    <>
      {currentUser && currentUser.role === 'admin' && (
        <div className='admin-header'>
          <div>
            Hi, <b>{currentUser.displayName}</b>. &nbsp;
            {location.pathname === '/admin' ? (
              <Link to='/' className='admin-link'>
                Go to Quiz
              </Link>
            ) : (
              <Link to='/admin' className='admin-link'>
                Go to admin dashboard
              </Link>
            )}
          </div>

          <div className='options'>
            {currentUser && currentUser.role === 'admin' && (
              <div className='option' onClick={() => auth.signOut()}>
                SIGN OUT
              </div>
            )}
          </div>
        </div>
      )}
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={() => (!currentUser ? <HomePage /> : <WheelPage />)}
        />
        <Route
          path='/wheel'
          render={() =>
            !currentUser ? <Redirect to='/signin' /> : <WheelPage />
          }
        />
        <Route
          path='/admin'
          render={() =>
            currentUser && currentUser.role === 'admin' ? (
              <Dashboard />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
      </Switch>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
