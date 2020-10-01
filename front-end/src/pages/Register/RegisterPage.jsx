import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  submitUser,
} from '../../utils/users';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (emailValidation(email)
    && passwordValidation(password)
    && nameValidation(name)) return setIsValid(true);

    if (!emailValidation(email)
    || !passwordValidation(password)
    || !nameValidation(name)) return setIsValid(false);

    return () => setIsValid(false);
  }, [email, password, name]);

  useEffect(() => {
    if (!isSubmit) return undefined;
    submitUser(name, email, password, isAdmin).then((response) => {
      setToken(response);
      setRedirect(true);
    }, (response) => {
      setError(response);
      setIsSubmit(false);
    });

    return () => {
      setIsAdmin(false);
      setIsValid(false);
      setIsSubmit(false);
      setRedirect(false);
    };
  }, [isSubmit, isAdmin, name, email, password, setToken]);

  if (redirect) {
    const { role } = JSON.parse(localStorage.getItem('user'));
    return role === 'administrator' ? <Redirect to="/admin/orders" /> : <Redirect to="/products" />;
  }

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      {error && <h4>{error}</h4>}
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
          Password
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
          Quero Vender
          <input onClick={ () => setIsAdmin(!isAdmin) } data-testid="signup-seller" type="checkbox" id="role" />
        </label>
        <button
          type="submit"
          disabled={ !isValid }
          style={ { width: '150px', margin: 'auto' } }
          data-testid="signup-btn"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
