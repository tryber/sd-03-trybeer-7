import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductContext from '../context/ProductContext';

const zero = 0;

const raiseProductQuantity = (product, productList, callback) => {
  const productIndex = productList.map((element) => element.id).indexOf(product.id);
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
  const productIndex = productList.map((element) => element.id).indexOf(product.id);
  productList[productIndex].quantity -= 1;
  if (productList[productIndex].quantity < 1) productList.splice(productIndex, 1);
  callback(productList);
};

const saveCartAtLocalStorage = (productList) => {
  const stringfiedProductList = JSON.stringify(productList);
  localStorage.setItem('productCart', stringfiedProductList);
};

const getQuantityFromCart = (productId, productList) => {
  const product = productList.find((element) => element.id === productId);
  return product ? product.quantity : zero;
};

export default function ProductCard({ product, index }) {
  const { productCart, setProductCart, update, setUpdate } = useContext(ProductContext);
  const {
    id, name, price, urlImage,
  } = product;

  useEffect(() => {
    saveCartAtLocalStorage(productCart);
  }, [productCart, update]);

  return (
    <div key={ name }>
      <img data-testid={ `${index}-product-img` } src={ urlImage } alt={ name } />
      <br />
      <p data-testid={ `${index}-product-name` }>{name}</p>
      <p data-testid={ `${index}-product-price` }>
        R$
        {price}
      </p>
      <br />
      <button
        data-testid={ `${index}-product-minus` }
        type="button"
        onClick={ () => {
          removeProductFromCart(product, productCart, setProductCart);
          setUpdate(!update);
        } }
        disabled={ getQuantityFromCart(id, productCart) < 1 }
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
