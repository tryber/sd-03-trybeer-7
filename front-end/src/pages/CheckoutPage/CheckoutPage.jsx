import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CheckoutCard from '../../components/CheckoutCard';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import AuthContext from '../../context/AuthContext';

function Checkout() {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <div>
      <ClientNavBar title="Finalizar Pedido" />
      <h1>Produtos</h1>
      {cartProducts.length && cartProducts.map((product, index) => (
        <CheckoutCard
          key={ product.id }
          index={ index }
          quantity={ product.quantity }
          price={ product.price }
          onClick={ null }
        />
      ))}
      <p data-testid="order-total-value">Total:</p>
      <div>
        <p>Endereço</p>
        <label htmlFor="delivery_address">
          Rua:
          <input type="text" id="delivery_address" data-testid="checkout-street-input" />
        </label>
        <label htmlFor="delivery_number">
          Número:
          <input type="number" id="delivery_number" data-testid="checkout-house-number-input" />
        </label>
        <button data-testid="checkout-finish-btn" type="button">Finalizar Pedido</button>
      </div>
    </div>
  );
}

export default Checkout;
