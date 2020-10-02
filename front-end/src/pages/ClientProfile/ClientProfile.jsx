import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
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
  const [user, setUser] = useState({ name: '', email: '' });
  const { name, email } = user || userData;
  const [updatedName, setUpdatedName] = useState(userData.name);
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (nameValidation(updatedName)
    && isValidName(updatedName)) setIsValid(true);

    if (!nameValidation(updatedName)
    || !isValidName(updatedName)) setIsValid(false);

    return () => setIsValid(false);
  }, [updatedName]);

  useEffect(() => {
    if (!user.name) setUser((previousUser) => ({ ...previousUser, ...userData }));
    if (!isSubmit) return undefined;
    updateUser(updatedName, email).then((response) => {
      setToken(response);
      setMessage('Atualização concluída com sucesso');
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

  if (!userData.name) return <Redirect to="/login" />;
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <ClientNavBar title="Meu perfil" />
      {error && <h4>{error}</h4>}
      {message && <h4>{message}</h4>}
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
            onChange={ (event) => setUpdatedName(event.target.value.trim()) }
            required
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
          disabled={ !isValid || name === updatedName }
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
