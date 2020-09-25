import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Buttons from './Buttons';

function renderNavBar(showBar, setShowBar) {
  return showBar === true ? setShowBar(false) : setShowBar(true);
}

const bar = () => (
  <div
    className="side-menu-container"
    style={ { width: '250px', height: '460px', backgroundColor: 'red' } }
  >
    <Buttons title="Produtos" link="/products" testId="side-menu-item-products" />
    <Buttons title="Meus pedidos" link="/orders" testId="side-menu-item-my-orders" />
    <Buttons title="Meu perfil" link="/profile" testId="side-menu-item-my-profile" />
    <Buttons title="Sair" link="/login" testId="side-menu-item-logout" />
  </div>
);

function NavBar({ title }) {
  const [showBar, setShowBar] = useState(false);
  return (
    <div style={ { width: '360px' } }>
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'black',
          color: 'white',
          width: '360px',
        } }
      >
        <button
          data-testid="top-hamburguer"
          type="button"
          onClick={ () => renderNavBar(showBar, setShowBar) }
          style={ { position: 'fixed', left: '10px', top: '20px' } }
        >
          =
        </button>
        <h2 data-testid="top-title">{title}</h2>
      </div>
      {showBar === true ? bar() : null}
    </div>
  );
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavBar;
