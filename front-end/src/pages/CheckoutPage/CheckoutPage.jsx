import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import Button from '../../components/NavBar/Button';
import AuthContext from '../../context/AuthContext';

function Checkout() {
  return (
    <div>
      <ClientNavBar title="Finalizar Pedido" />
      <p>Total:</p>
      {Button('Finalizar Pedido', null, 'checkout-finish-btn')}
    </div>
  );
}

export default Checkout;
