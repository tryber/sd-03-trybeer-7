import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../services';
import AuthContext from '../../context/AuthContext';

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
  return !!name && typeof name === 'string' && !!name.match(nameRegex);
};
const minimumNameLength = 12;
const isValidName = (name) => name.length >= minimumNameLength;

function ClientProfile() {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);

  const { loggedIn, user, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (nameValidation(name)
    && isValidName(name)) setIsValid(true);

    if (!nameValidation(name)
    || !isValidName(name)) setIsValid(false);

    return () => setIsValid(false);
  }, [name]);

  useEffect(() => {
    if (!isSubmit) return undefined;
    updateUser(name, user.email).then((response) => {
      setToken(response);
      return setIsSubmit(false);
    }, (response) => {
      setError(response);
      return setIsSubmit(false);
    });

    return () => {
      setIsValid(false);
      setIsSubmit(false);
    };
  }, [isSubmit, name, user.email, setToken]);

  if (!loggedIn) return <Redirect to="/login" />;
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
            data-testid="profile-name-input"
            placeholder="Nome"
            type="text"
            value={ user.name }
            onChange={ (event) => setName(event.target.value) }
            required
            minLength={ 12 }
            maxLength={ 100 }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            data-testid="profile-email-input"
            type="email"
            value={ user.email }
            readOnly
          />
        </label>
        <button
          type="submit"
          disabled={ !isValid }
          style={ { width: '150px', margin: 'auto' } }
          data-testid="profile-save-btn"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default ClientProfile;
