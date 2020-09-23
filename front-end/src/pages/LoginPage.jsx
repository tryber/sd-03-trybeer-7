import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const isEmailValid = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};
const minimumPassLength = 6;
const isPasswordValid = (password) => password.length >= minimumPassLength;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isEmailValid(email) && isPasswordValid(password)) setIsValid(true);
    if (!isEmailValid(email) || !isPasswordValid(password)) setIsValid(false);
  }, [email, password]);

  return (
    <div style={ { margin: 'auto', height: '640px', display: 'flex' } }>
      <form className="form-container">
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
        <label htmlFor="passoword">
          Senha
          <input
            id="password"
            data-testid="password-input"
            placeholder="Senha"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            required
            minLength={ 6 }
          />
        </label>
        <br />
        <Link to="/">
          <button type="button" data-testid="signin-btn" disabled={ !isValid }>
            Entrar
          </button>
        </Link>
        <Link to="/register">
          <button type="button" data-testid="no-account-btn">
            Ainda nao tenho conta
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
