import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductsContext from '../../context/ProductContext';
import { zero, getCartTotal } from '../../utils/products';

const CheckoutButton = () => {
  const { productCart, update } = useContext(ProductsContext);

  useEffect(() => {
  }, [productCart, update]);

  return (
    <div>
      <Link to="/checkout">
        <button disabled={ productCart.length === zero } data-testid="checkout-bottom-btn" type="button">
          <p data-testid="checkout-bottom-btn-value">
            {`Ver Carrinho | R$ ${getCartTotal(productCart)}`}
          </p>
        </button>
      </Link>
    </div>
  );
};

export default CheckoutButton;
