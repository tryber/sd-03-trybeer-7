import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CheckoutCard from '../../components/CheckoutCard';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';

function Checkout() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const cartData = JSON.parse(localStorage.getItem('productCart') || '[]');
  const [cartProducts, setCartProducts] = useState([]);

  const removeProduct = (name) => cartProducts.filter((product) => product.name !== name);

  useEffect(() => {
    setCartProducts(cartData);
    return () => {
      setCartProducts([]);
    };
  }, [cartData]);

  if (!userData) return <Redirect to="/login" />;

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
          onClick={ () => removeProduct(product.name) }
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
