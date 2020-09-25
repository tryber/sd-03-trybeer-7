import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductContext from './ProductContext';

const ProductContextProvider = ({ children }) => {
  const [productCart, setProductCart] = useState([]);

  const context = {
    productCart,
    setProductCart,
  };

  return <ProductContext.Provider value={ context }>{children}</ProductContext.Provider>;
};

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductContextProvider;
