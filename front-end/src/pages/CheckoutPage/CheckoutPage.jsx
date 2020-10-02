import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ProductContext from '../../context/ProductContext';
import CheckoutCard from '../../components/CheckoutCard';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import { registerOrder } from '../../services';
import { saveCartAtLocalStorage } from '../../utils/products';

const cartPrice = (cartProducts = []) => {
  const initialTotal = 0;
  const totalValue = cartProducts
    .reduce((acc, product) => acc + (product.quantity * product.price), initialTotal);
  return totalValue;
};

const removeProduct = (name, products = [], callback) => {
  const updateCart = products.filter((product) => product.name !== name);
  callback([...updateCart]);
  return saveCartAtLocalStorage([...updateCart]);
};

const initialTotal = 0;
const initialQuantity = 0;
const initialFloat = 2;

function Checkout() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const cartData = JSON.parse(localStorage.getItem('productCart') || '[]');
  const { productCart, setProductCart } = useContext(ProductContext);
  const [cartProducts, setCartProducts] = useState(cartData);
  const [totalPrice, setTotalPrice] = useState(cartPrice(cartData));
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (cartProducts.length === productCart.length) return undefined;
    setCartProducts(productCart);
    setTotalPrice(cartPrice(productCart));
    return () => {
      setCartProducts([]);
      setTotalPrice(initialTotal);
    };
  }, [productCart, cartProducts]);

  useEffect(() => {
    if (!isSubmit && !message) return undefined;
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
      setError('');
    };
  }, [cartProducts, deliveryAddress, deliveryNumber, totalPrice, userData.id, isSubmit, message]);

  useEffect(() => {
    if (!message) return undefined;
    const timerCount = 3000;
    const timer = setTimeout(() => setRedirect(true), timerCount);
    return () => {
      setRedirect(false);
      clearTimeout(timer);
    };
  }, [isSubmit, message]);

  if (!userData.name) return <Redirect to="/login" />;

  if (redirect) return <Redirect to="/products" />;

  return (
    <div>
      <ClientNavBar title="Finalizar Pedido" />
      <h1>Produtos</h1>
      {!isSubmit && message && <h3>{message}</h3>}
      {!isSubmit && error && <h3>{error}</h3>}
      {!isSubmit && !cartProducts.length && <h1>Não há produtos no carrinho</h1>}
      {!isSubmit && cartProducts.length > initialQuantity && cartProducts.map((product, index) => (
        <CheckoutCard
          key={ product.id }
          index={ index }
          quantity={ product.quantity }
          name={ product.name }
          price={ product.price }
          onClick={ () => removeProduct(product.name, cartProducts, setProductCart) }
        />
      ))}
      <span>
        <p>Total:</p>
        <p data-testid="order-total-value">
          {`R$ ${totalPrice.toFixed(initialFloat).replace('.', ',')}`}
        </p>
      </span>
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
        <button data-testid="checkout-finish-btn" type="button" onClick={ () => setIsSubmit(true) } disabled={ totalPrice === initialTotal || !deliveryAddress || !deliveryNumber }>Finalizar Pedido</button>
      </div>
    </div>
  );
}

export default Checkout;
