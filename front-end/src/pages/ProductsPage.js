import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [productCart, setProductCart] = useState([]);

  const getProducts = async () => fetch('http://localhost:3001/products')
    .then((response) => response.json().then((data) => (response.ok
      ? Promise.resolve(data)
      : Promise.reject(data.message))));

  const raiseProductQuantity = (product, productList) => {
    const productIndex = productList.indexOf((element) => element.id === product.id);
    productList[productIndex].quantity = +1;
    return productList;
  };

  const createProductAtCart = (product, productList) => {
    product.quantity = 1;
    const productWithQuantity = product;
    productList.push(productWithQuantity);
    return productList;
  };

  const addProductToCart = (product) => {
    const isProductAlreadyAtCart = productCart.find((element) => element.id === product.id);
    setProductCart(
      isProductAlreadyAtCart
        ? raiseProductQuantity(product, productCart)
        : createProductAtCart(product, productCart),
    );
    return null;
  };

  const removeProductFromCart = (product) => {
    const removedProductIndex = productCart.indexOf((element) => element.id === product.id);
    setProductCart(productCart.splice(removedProductIndex));
  };

  useEffect(() => {
    const response = getProducts();
    setProducts(response);
  }, [products]);

  return products ? null
    : (
      <div>
        {products.map((product) => (
          <div key={ product.name }>
            <img src={ product.imageUrl } alt={ product.name } />
            <br />
            <p>{product.name}</p>
            <br />
            <button
              type="button"
              onCLick={ removeProductFromCart(product) }
              disabled={ product.quantity && product.quantity < 1 }
            >
              -
            </button>
            <p>{ product.quantity ? product.quantity : '0' }</p>
            <button type="button" onClick={ () => addProductToCart(product) }>+</button>
          </div>))}
      </div>
    );
};

export default ProductsPage;
