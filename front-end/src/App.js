import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider';
import './App.css';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={ LoginPage } />
            <Route exact path="/products" component={ ProductsPage } />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
