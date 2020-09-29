import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductContext from '../../context/ProductContext';
import {
  addProductToCart,
  removeProductFromCart,
  saveCartAtLocalStorage,
  getQuantityFromCart,
  formatPrice,
} from '../../utils/products';

export default function ProductCard({ product, index }) {
  const { productCart, setProductCart, update, setUpdate } = useContext(ProductContext);
  const { id, name, price, urlImage } = product;

  useEffect(() => {
    saveCartAtLocalStorage(productCart);
  }, [productCart, update]);

  return (
    <div key={ name }>
      <img data-testid={ `${index}-product-img` } src={ urlImage } alt={ name } />
      <br />
      <p data-testid={ `${index}-product-name` }>{name}</p>
      <p data-testid={ `${index}-product-price` }>{`R$ ${formatPrice(price)}`}</p>
      <br />
      <button
        data-testid={ `${index}-product-minus` }
        type="button"
        onClick={ getQuantityFromCart(id, productCart) < 1 ? null : () => {
          removeProductFromCart(product, productCart, setProductCart);
          setUpdate(!update);
        } }
      >
        -
      </button>
      <p data-testid={ `${index}-product-qtd` }>{getQuantityFromCart(id, productCart)}</p>
      <button
        data-testid={ `${index}-product-plus` }
        type="button"
        onClick={ () => {
          addProductToCart(product, productCart, setProductCart);
          setUpdate(!update);
        } }
      >
        +
      </button>
    </div>);
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
