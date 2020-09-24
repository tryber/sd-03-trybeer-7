import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../services';
import AuthContext from '../../context/AuthContext';

const emailValidation = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
  return !!name && typeof name === 'string' && !!name.match(nameRegex);
};
const minimumNameLength = 12;
const isValidName = (name) => name.length >= minimumNameLength;

const minimumLength = 6;
const isPasswordValid = (password) => password.length >= minimumLength;

const submitUser = async (name, email, password, role) => {
  const userRole = role ? 'administrator' : 'client';
  const token = await registerUser(name, email, password, userRole);
  return token;
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { setToken, loggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if (emailValidation(email)
    && isPasswordValid(password)
    && nameValidation(name)
    && isValidName(name)) setIsValid(true);

    if (!emailValidation(email)
    || !isPasswordValid(password)
    || !nameValidation(name)
    || !isValidName(name)) setIsValid(false);

    return () => setIsValid(false);
  }, [email, password, name]);

  useEffect(() => {
    if (!isSubmit) return undefined;
    submitUser(name, email, password, isAdmin).then((response) => setToken(response));
    setIsSubmit(false);
    return () => {
      setIsAdmin(false);
      setIsValid(false);
      setIsSubmit(false);
    };
  }, [isSubmit, isAdmin, name, email, password, setToken]);

  if (loggedIn && user.role === 'client') return <Redirect to="/products" />;

  if (loggedIn && user.role === 'administrator') return <Redirect to="/admin/orders" />;

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          setIsSubmit(true);
        } }
      >
        <label htmlFor="name">
          Nome
          <input
            id="name"
            data-testid="signup-name"
            placeholder="Nome"
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            required
            minLength={ 12 }
            maxLength={ 100 }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            data-testid="signup-email"
            placeholder="Email"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            data-testid="signup-password"
            placeholder="Senha"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            required
            minLength={ 6 }
          />
        </label>
        <label htmlFor="role">
          Quero vender
          <input onClick={ () => setIsAdmin(!isAdmin) } data-testid="signup-seller" type="checkbox" id="role" />
        </label>
        <button
          type="submit"
          disabled={ !isValid }
          style={ { width: '150px', margin: 'auto' } }
          data-testid="signup-btn"
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
