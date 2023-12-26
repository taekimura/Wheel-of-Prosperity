import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import HomePage from './pages/homepage/HomePage';
import WheelPage from './pages/wheel/WheelPage';
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

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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
      {currentUser && <Header currentUser={currentUser} />}
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
            currentUser && currentUser.role === 'admin' && <Dashboard />
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
