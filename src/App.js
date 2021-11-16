import './css/App.css';
import Login from './js/Login';
import Dashboard from './js/Dashboard';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

function App() {
  const [authenticated, setAuthenticated] = useState(true)

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
        <Route exact path="/" component={() => <Login authenticated={authenticated}/>}>
        </Route>
        <Route path="/dashboard" component={() => <Dashboard authenticated={authenticated}/>}>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}


export default App;
