import React, { useState } from 'react';
import Button from './Button';

function renderNavBar(showBar, setShowBar) {
  return showBar === true ? setShowBar(false) : setShowBar(true);
}

const bar = (role) => {
  role === "client" ? (
    <div
      className="side-menu-container"
      style={{ width: '250px', height: '460px', backgroundColor: 'black' }}
    >
      {Button('Produtos', '/products', 'side-menu-item-products')}
      {Button('Meus pedidos', '/orders', 'side-menu-item-my-orders')}
      {Button('Meu perfil', '/profile', 'side-menu-item-my-profile')}
      {Button('Sair', '/login', 'side-menu-item-logout')}
    </div>
  ) : (
  <div><p>{role}</p></div>
  );
};

function NavBar({ title = 'Trybeer', role }) {
  const [showBar, setShowBar] = useState(false);
  return (
    <div style={{ width: '360px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'black',
          color: 'white',
          width: '360px',
        }}
      >
        <button
          data-testid="top-hamburguer"
          onClick={(e) => renderNavBar(showBar, setShowBar)}
          style={{ position: 'fixed', left: '10px', top: '20px' }}
        >
          =
        </button>
        <h2 data-testid="top-title">{title}</h2>
      </div>
      {showBar === true ? bar(role) : null}
    </div>
  );
}

export default NavBar;
