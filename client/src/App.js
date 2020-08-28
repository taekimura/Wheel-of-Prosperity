import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import './App.scss';

import HomePage from './pages/homepage/HomePage';
import WheelPage from './pages/wheel/WheelPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import Header from './components/Header/Header.component';
import Dashboard from './components/Dashboard/Dashboard.component';
import { auth, createUserProfileDocument } from './components/firebase/firebase_utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selector';
import Loading from './components/Loading/Loading';

function App({ setCurrentUser, currentUser }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
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

  if (isLoading) return (<Loading />)

  return (
    <>
      {
        currentUser && currentUser.role === "admin" && (
          <div className="admin-header">
            Hi, <b>{currentUser.displayName}</b>. <Link to="/admin" className="admin-link">Go to admin dashboard</Link>
          </div>
        )
      }

      <Header />
      <Switch>
        <Route exact path='/' render={() => !currentUser ? (<HomePage />) : (<WheelPage />)} />
        <Route path='/wheel' render={() => !currentUser ? (<Redirect to="/signin" />) : (<WheelPage />)} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to="/wheel" />) : (<SignInAndSignUpPage />)} />
        {currentUser && <Route path='/admin' render={() => currentUser.role === "admin" ? (<Dashboard />) : (<WheelPage />)} />}
      </Switch>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
  // functionName: (x) => {functionName(x)}
});

export default connect(mapStateToProps, mapDispatchtoProps)(App);
