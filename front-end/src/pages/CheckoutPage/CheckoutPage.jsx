import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CheckoutCard from '../../components/CheckoutCard';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import { registerOrder } from '../../services';
import { saveCartAtLocalStorage } from '../../utils/products';

const redirectOnPurchase = (callback) => {
  const timer = 3000;
  const redirect = setTimeout(() => callback(true), timer);
  return redirect;
};

const cartPrice = (cartProducts = [], initialToTal) => {
  const totalValue = !cartProducts.length
    ? initialToTal
    : cartProducts
      .reduce((acc, product) => acc + (product.quantity * product.price), initialToTal);
  return totalValue;
};

const removeProduct = (name, products = []) => {
  const updateCart = products.filter((product) => product.name !== name);
  return saveCartAtLocalStorage(updateCart);
};

function Checkout() {
  const initialTotal = 0;
  const initialFloat = 2;
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const cartData = JSON.parse(localStorage.getItem('productCart') || '[]');
  const initialToTal = 0;
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(initialTotal);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (cartProducts.length === cartData.length) return undefined;
    setCartProducts(cartData);
    setTotalPrice(cartPrice(cartProducts, initialToTal));
    return () => {
      setCartProducts([]);
    };
  }, [cartData, cartProducts]);

  useEffect(() => {
    if (!isSubmit) return undefined;
    registerOrder(userData.id, totalPrice, deliveryAddress, deliveryNumber, cartProducts)
      .then(() => {
        setMessage('Compra realizada com sucesso!');
        localStorage.removeItem('productCart');
        return setIsSubmit(false);
      }, (response) => {
        setError(response);
        return setIsSubmit(false);
      });
    return () => {
      setIsSubmit(false);
      clearTimeout(redirectOnPurchase(setRedirect));
      setRedirect(false);
    };
  }, [cartProducts, deliveryAddress, deliveryNumber, totalPrice, userData.id, isSubmit]);

  useEffect(() => {
    if (!isSubmit && !message) return undefined;
    const timer = redirectOnPurchase(setRedirect);
    if (!isSubmit && message) return timer;
    return () => {
      setRedirect(false);
      clearTimeout(timer);
    };
  }, [isSubmit, message]);

  if (!userData) return <Redirect to="/login" />;

  if (redirect) return <Redirect to="/products" />;

  return (
    <div>
      <ClientNavBar title="Finalizar Pedido" />
      <h1>Produtos</h1>
      {!isSubmit && message && <h3>{message}</h3>}
      {!isSubmit && error && <h3>{error}</h3>}
      {!isSubmit && !cartProducts.length && <h1>Não há produtos no carrinho</h1>}
      {!isSubmit && cartProducts.length && cartProducts.map((product, index) => (
        <CheckoutCard
          key={ product.id }
          index={ index }
          quantity={ product.quantity }
          price={ product.price }
          onClick={ () => removeProduct(product.name, cartProducts) }
        />
      ))}
      <p data-testid="order-total-value">
        Total: R$
        {parseFloat(totalPrice.toFixed(initialFloat).replace('.', ','))}
      </p>
      <div>
        <p>Endereço</p>
        <label htmlFor="delivery_address">
          Rua:
          <input type="text" id="delivery_address" data-testid="checkout-street-input" value={ deliveryAddress } onChange={ (event) => setDeliveryAddress(event.target.value) } />
        </label>
        <label htmlFor="delivery_number">
          Número:
          <input type="number" id="delivery_number" data-testid="checkout-house-number-input" value={ deliveryNumber } onChange={ (event) => setDeliveryNumber(event.target.value) } />
        </label>
        <button data-testid="checkout-finish-btn" type="button" onClick={ () => setIsSubmit(true) } disabled={ !totalPrice && !deliveryAddress && !deliveryNumber }>Finalizar Pedido</button>
      </div>
    </div>
  );
}

export default Checkout;
