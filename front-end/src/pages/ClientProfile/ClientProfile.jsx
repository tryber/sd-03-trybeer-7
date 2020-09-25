import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import NavBar from '../../components/NavBar';
import { updateUser } from '../../services';

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
  return !!name && typeof name === 'string' && !!name.match(nameRegex);
};
const minimumNameLength = 12;
const isValidName = (name) => name.length >= minimumNameLength;

function ClientProfile() {
  const { setToken } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(null);
  const { name, email } = user || userData;
  const [updatedName, setUpdatedName] = useState(name);
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (nameValidation(updatedName)
    && isValidName(updatedName)) setIsValid(true);

    if (!nameValidation(updatedName)
    || !isValidName(updatedName)) setIsValid(false);

    return () => setIsValid(false);
  }, [updatedName]);

  useEffect(() => {
    if (!user) setUser(userData);
    if (!isSubmit) return undefined;
    updateUser(updatedName, email).then((response) => {
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
  }, [isSubmit, setToken, updatedName, email, userData, user]);

  if (!userData) return <Redirect to="/login" />;
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <NavBar title="Meu perfil" />
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
            name="name"
            data-testid="profile-name-input"
            placeholder="Nome"
            type="text"
            value={ updatedName }
            onChange={ (event) => setUpdatedName(event.target.value) }
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
            value={ email }
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
