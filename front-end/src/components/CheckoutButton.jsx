import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductsContext from '../context/ProductContext';

const getCartTotal = (productList) => Math.round(productList.reduce((acc, product) => acc
  + (product.price * product.quantity), 0) * 100) / 100;

const CheckoutButton = () => {
  const { productCart, update } = useContext(ProductsContext);

  useEffect(() => {
  }, [productCart, update]);

  return productCart && productCart.length > 0 ? (
    <div>
      <Link to="/checkout">
        <button data-testid="checkout-bottom-btn" type="button">
          <p data-testid="checkout-bottom-btn-value">
            Ver Carrinho R$
            {getCartTotal(productCart)}
          </p>
        </button>
      </Link>
    </div>
  ) : null;
};

export default CheckoutButton;
