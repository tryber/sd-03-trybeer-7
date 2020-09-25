import React from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar';

function AdminProfile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData || userData.role !== "administrator") return <Redirect to="/login" />;
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <NavBar title="Meu perfil" />
      <div>
          <h2>Perfil</h2>
          <h3 data-testid="profile-name">Nome: {userData.name}</h3>
          <h3 data-testid="profile-email">Email: {userData.email}</h3>
      </div>
    </div>
  );
}

export default AdminProfile;
