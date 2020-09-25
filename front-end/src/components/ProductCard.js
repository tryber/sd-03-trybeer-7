import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProductContext from '../context/ProductContext';

const raiseProductQuantity = (product, productList, callback) => {
  const productIndex = productList.indexOf(product);
  productList[productIndex].quantity += 1;
  callback(productList);
  return null;
};

const createProductAtCart = (product, productList, callback) => {
  product.quantity = 1;
  productList.push(product);
  callback(productList);
  return null;
};

const addProductToCart = (product, productList, callback) => {
  const isProductAlreadyAtCart = productList.find(
    (element) => element.id === product.id,
  );
  return isProductAlreadyAtCart
    ? raiseProductQuantity(product, productList, callback)
    : createProductAtCart(product, productList, callback);
};

const removeProductFromCart = (product, productList, callback) => {
  const productIndex = productList.indexOf(product);
  if (productList[productIndex].quantity <= 1) {
    productList.splice(productIndex);
    callback(productList);
  }
  if (productList[productIndex].quantity > 1) {
    productList[productIndex].quantity -= 1;
    callback(productList);
  }
  return null;
};

export default function ProductCard({ product }) {
  const { productCart, setProductCart } = useContext(ProductContext);
  const initialQuantity = 0;
  return (
    <div key={ product.name }>
      <img src={ product.urlImage } alt={ product.name } />
      <br />
      <p>{product.name}</p>
      <br />
      <button
        type="button"
        onClick={ () => removeProductFromCart(product, productCart, setProductCart) }
        disabled={ !product.quantity && product.quantity < 1 }
      >
        -
      </button>
      <p>{product.quantity ? product.quantity : initialQuantity}</p>
      <button
        type="button"
        onClick={ () => addProductToCart(product, productCart, setProductCart) }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};
