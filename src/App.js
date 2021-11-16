import './css/App.css';
import Login from './js/Login';
import Dashboard from './js/Dashboard';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Login}>
        </Route>
        <Route path="/about" component={About}>
        </Route>
        <Route path="/dashboard" component={Dashboard}>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}


export default App;
