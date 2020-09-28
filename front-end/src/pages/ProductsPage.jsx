import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import CheckoutButton from '../components/CheckoutButton';
import ClientNavBar from '../components/NavBar/ClientBar/ClientNavBar';
import ProductContext from '../context/ProductContext';

const fetchData = async () => {
  try {
    const result = await fetch('http://localhost:3001/products/all');
    const json = await result.json();
    return json;
  } catch (error) {
    return (error.message);
  }
};

const getCartAtLocalStorage = (callback) => {
  const zero = 0;
  const localProductCart = localStorage.getItem('productCart');
  return localProductCart && localProductCart.length > zero
    ? callback(JSON.parse(localStorage.getItem('productCart')))
    : null;
};

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productCart, setProductCart } = useContext(ProductContext);

  useEffect(() => {
    setIsLoading(true);
    fetchData().then((data) => setProducts(data));
    setIsLoading(false);
    getCartAtLocalStorage(setProductCart);
  }, [setProductCart]);

  useEffect(() => {
  }, [productCart]);

  return isLoading ? <h1>Carregando...</h1> : (
    <div>
      <ClientNavBar title="TryBeer" />
      <div>
        { Array.isArray(products)
          ? products.map((product, i) => (
            <ProductCard
              key={ product.name }
              product={ product }
              index={ i }
            />))
          : null }
      </div>
      <CheckoutButton />
    </div>
  );
};

export default ProductsPage;
