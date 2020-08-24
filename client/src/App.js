import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import HomePage from './pages/homepage/HomePage';
import WheelPage from './pages/wheel/WheelPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import Header from './components/Header/Header.component';
import Dashboard from './components/Dashboard/Dashboard.component';
import { auth, createUserProfileDocument } from './components/firebase/firebase_utils';
import { setCurrentUser } from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/user.selector';

function App({setCurrentUser,currentUser}) {

  useEffect(()=>{
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      }else{
        setCurrentUser(userAuth);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  },[]);

  useEffect(()=> console.log('WHO IS LOGGED IN? ',currentUser), [currentUser])

  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' render={() => !currentUser ? (<HomePage />) : (<WheelPage />)} />
        <Route path='/wheel' render={() => !currentUser ? (<Redirect to="/signin" />) : (<WheelPage />)} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to="/wheel" />) : (<SignInAndSignUpPage />)} />
        <Route path='/admin' component={Dashboard} />
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

export default connect(mapStateToProps,mapDispatchtoProps)(App);
