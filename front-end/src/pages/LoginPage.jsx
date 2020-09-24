import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { userLogin } from '../services';

const isEmailValid = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};
// guardando numero numa variavel como pede o Eslint (No magic number rule)
const minimumLength = 6;
const isPasswordValid = (password) => password.length >= minimumLength;

const LoginPage = () => {
  const { setToken, user, loggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [hasLogged, setHasLogged] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEmailValid(email) && isPasswordValid(password)) setIsValid(true);
    if (!isEmailValid(email) || !isPasswordValid(password)) setIsValid(false);
  }, [email, password]);

  useEffect(() => {
    if (!hasLogged) return undefined;
    userLogin(email, password)
      .then((response) => {
        setToken(response);
        return setHasLogged(false);
      }, (response) => {
        setError(response);
        return setHasLogged(false);
      });

    return () => {
      setHasLogged(false);
      setError(null);
    };
  }, [hasLogged, email, error, password, setToken]);

  if (loggedIn && user.role === 'client') return <Redirect to="/products" />;

  if (loggedIn && user.role === 'administrator') return <Redirect to="/admin/orders" />;

  return (
    <div style={ { margin: 'auto', height: '640px', display: 'flex' } }>
      {error && <h4>{error}</h4>}
      <form
        className="form-container"
        onSubmit={ (event) => {
          event.preventDefault();
          setHasLogged(!hasLogged);
        } }
      >
        <label htmlFor="email">
          Email
          <input
            id="email"
            data-testid="email-input"
            placeholder="Email"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            data-testid="password-input"
            placeholder="Password"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            required
            minLength={ 6 }
          />
        </label>
        <br />
        <button type="submit" data-testid="signin-btn" disabled={ !isValid }>
          ENTRAR
        </button>
        <Link to="/register">
          <button type="button" data-testid="no-account-btn">
            Ainda não tenho conta
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
