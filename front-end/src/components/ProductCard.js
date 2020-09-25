import React, { useContext, useEffect, useState } from 'react';
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
  const isProductAlreadyAtCart = productList.find((element) => element.id === product.id);
  return isProductAlreadyAtCart
    ? raiseProductQuantity(product, productList, callback)
    : createProductAtCart(product, productList, callback);
};

const removeEntireProduct = (index, productList, callback) => {
  productList.splice(index, 1);
  callback(productList);
};

const lowerProductQuantity = (index, productList, callback) => {
  productList[index].quantity -= 1;
  callback(productList);
};

const removeProductFromCart = (product, productList, callback) => {
  const productIndex = productList.indexOf(product);
  const isSingleProduct = productList[productIndex].quantity
  && productList[productIndex].quantity <= 1;

  return isSingleProduct
    ? removeEntireProduct(productIndex, productList, callback)
    : lowerProductQuantity(productIndex, productList, callback);
};

export default function ProductCard({ product }) {
  const { productCart, setProductCart } = useContext(ProductContext);
  const { name, imageUrl } = product;
  const [updateQuantity, setUpdateQuantity] = useState(false);

  useEffect(() => {
  }, [productCart, updateQuantity]);

  return (
    <div key={ name }>
      <img src={ imageUrl } alt={ name } />
      <br />
      <p>{name}</p>
      <br />
      <button
        type="button"
        onClick={ () => {
          removeProductFromCart(product, productCart, setProductCart, setUpdateQuantity);
          setUpdateQuantity(!updateQuantity);
        } }
        disabled={ product.quantity ? product.quantity < 1 : true }
      >
        -
      </button>
      <p>{product.quantity ? product.quantity : 0 }</p>
      <button
        type="button"
        onClick={ () => {
          addProductToCart(product, productCart, setProductCart);
          setUpdateQuantity(!updateQuantity);
        } }
      >
        +
      </button>
    </div>);
}

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.string).isRequired,
};
