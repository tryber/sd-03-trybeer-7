import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  const path = window.location.pathname;
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path={ path === '/' || '/login' } component={ LoginPage } />
            <Route path="/register" component={ RegisterPage } />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
