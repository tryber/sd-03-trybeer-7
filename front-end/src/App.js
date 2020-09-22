import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Provider from './context/Provider';

function App() {
  return (
    <div className="App">
      <Provider>
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
