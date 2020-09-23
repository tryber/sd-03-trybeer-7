import React, { useState, useEffect } from 'react';

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

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    emailValidation(email) && isPasswordValid(password) && nameValidation(name) && isValidName(name)
      ? setIsValid(true)
      : setIsValid(false);
  }, [email, password, name]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label>
        Nome
        <input
          data-testid="signup-name"
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={12}
          maxLength={100}
        />
      </label>{' '}
      <label>
        Email
        <input
          data-testid="signup-email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>{' '}
      <label>
        Senha
        <input
          data-testid="signup-password"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </label>
      <label>
        Quero vender
        <input data-testid="signup-seller" type="checkbox" />
      </label>
      <button
        disabled={!isValid}
        style={{ width: '150px', margin: 'auto' }}
        data-testid="signup-btn"
      >
        CADASTRAR
      </button>
    </div>
  );
};

export default RegisterPage;
