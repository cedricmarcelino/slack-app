import './css/App.css';
import Login from './js/Login';
import Dashboard from './js/Dashboard';
import React, { useState, useEffect } from "react";
import Signup from './js/Signup'
import Home from './js/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  
  const localStorageCurrentUser = localStorage.getItem("currentUser")
  let currentUserData = {}
  if(localStorageCurrentUser) {
    currentUserData = JSON.parse(localStorageCurrentUser)
  }
  
  const [currentUser, setCurrentUser] = useState(currentUserData)

  useEffect(()=>{
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
  },[currentUser])


  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={() => <Home 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        />}>
        </Route>
        <Route path="/dashboard" component={() => <Dashboard 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        />}>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}


export default App;
