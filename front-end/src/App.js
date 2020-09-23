import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={ LoginPage } />
            <Route path="/register" component={ RegisterPage } />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
