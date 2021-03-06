import React from 'react';
import Button from '../Button';

function ClientButtons() {
  return (
    <div>
      {Button('Produtos', '/products', 'side-menu-item-products')}
      {Button('Meus pedidos', '/orders', 'side-menu-item-my-orders')}
      {Button('Meu perfil', '/profile', 'side-menu-item-my-profile')}
      {Button('Sair', '/login', 'side-menu-item-logout')}
    </div>
  );
}

export default ClientButtons;
