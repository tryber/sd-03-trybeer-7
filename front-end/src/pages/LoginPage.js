import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserToken from '../context/context';
import * as jwt from 'jsonwebtoken'; 

const SECRET = 'tryberteam7';

const decodeToken = (token, secret) => {
  if (!token) return undefined;
  console.log('passei no if de decode token')
  const data = jwt.verify(token, secret);
  return localStorage.setItem('jwt', JSON.stringify(data))
}

const isEmailValid = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};
// guardando numero numa variavel como pede o Eslint (No magic number rule)
const minimumLength = 6;
const isPasswordValid = (password) => password.length > minimumLength;

const submitData = (email, password, callback) => {
  console.log('chamando submitData');
  return fetch('http://localhost:3001/user/login', {
    method: 'post',
    body: JSON.stringify({ email, password })
  }).then((response) => response.json())
    .then((res => callback(jwt.verify(Object.values(res)[0], SECRET))))
    // .then((res) => decodeToken(...Object.values(res), SECRET))
    // .then((res) => console.log(`retorno de submit data: ${res}`));
}

const LoginPage = () => {
  const { setToken, token } = useContext(UserToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(`o token e: ${token ? Object.entries(token) : null}`)
  useEffect(() => {
    if (isEmailValid(email) && isPasswordValid(password)) setIsValid(true);
    if (!isEmailValid(email) || !isPasswordValid(password)) setIsValid(false);
  }, [email, password]);

  useEffect(() => {
    if (!loading) return;
    submitData(email, password, setToken);
    setLoading(false)
  }, [loading])

  return (
    <div style={{ margin: 'auto', height: '640px', display: 'flex' }}>
      <form onSubmit={(event) => {event.preventDefault();
        setLoading(true)}} className="form-container">
        <input
          name="email"
          data-testid="email-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          data-testid="password-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <br />
          <button
            type="submit"
            data-testid="signin-btn"
            disabled={!isValid}
          // onClick={() => setLocalStorage(email)}
          >
            Entrar
          </button>
        <Link to="/register">
          <button
            type="button"
            data-testid="no-account-btn"
          >
            Ainda nao tenho conta
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
