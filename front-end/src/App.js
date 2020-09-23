import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Redirect to="/login">
              <Route exact path="/"/>
            </Redirect>
            <Route exact path="/login" component={ LoginPage } />
            <Route path="/register" component={ RegisterPage } />
            <Route path="/navbartest" component={ NavBar } />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
