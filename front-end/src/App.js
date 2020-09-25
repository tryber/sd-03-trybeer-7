import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider';
import ProductProvider from './context/ProductContextProvider';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/Register/RegisterPage';
import ClientProfile from './pages/ClientProfile/ClientProfile';

function App() {
  const path = window.location.pathname;
  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <Router>
            <Switch>
              <Route exact path="/products" component={ ProductsPage } />
              <Route exact path={ path === '/' || '/login' } component={ LoginPage } />
              <Route path="/register" component={ RegisterPage } />
              <Route path="/profile" component={ ClientProfile } />
            </Switch>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
