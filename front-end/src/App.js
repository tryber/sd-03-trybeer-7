import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
