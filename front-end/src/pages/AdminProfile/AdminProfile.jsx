import React from 'react';
import { Redirect } from 'react-router-dom';
import AdminNavBar from '../../components/NavBar/AdminBar/AdminNavBar';
import '../Login/loginPage.css';

function AdminProfile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData || userData.role !== 'administrator') return <Redirect to="/login" />;
  return (
    <div
      style={ {
        display: 'flex', flexDirection: 'column', margin: 'auto', height: '640px',
      } }
    >
      <AdminNavBar title="Meu perfil" />
      <div className="form-container">
        <div className="login-div-inputs login-labels">
          <h2 className="profile-title">Perfil</h2>
          <p data-testid="profile-name">
            {`Nome: ${userData.name}`}
          </p>
        </div>
        <p data-testid="profile-email">
          {`Email: ${userData.email}`}
        </p>
      </div>
    </div>
  );
}

export default AdminProfile;
