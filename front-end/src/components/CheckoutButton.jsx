import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductsContext from '../context/ProductContext';

const zero = 0;

const getCartTotal = (productList) => {
  const total = productList.reduce(
    (acc, product) => acc + (product.price * product.quantity), zero,
  );
  const formatedTotal = total.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatedTotal;
};

const CheckoutButton = () => {
  const { productCart, update } = useContext(ProductsContext);

  useEffect(() => {
  }, [productCart, update]);

  return (
    <div>
      <Link to="/checkout">
        <button data-testid="checkout-bottom-btn" type="button">
          <p data-testid="checkout-bottom-btn-value">
            {`Ver Carrinho | R$ ${getCartTotal(productCart)}`}
          </p>
        </button>
      </Link>
    </div>
  );
};

export default CheckoutButton;
