import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ProductCard from '../components/Products/ProductCard';
import CheckoutButton from '../components/Products/CheckoutButton';
import ClientNavBar from '../components/NavBar/ClientBar/ClientNavBar';
import ProductContext from '../context/ProductContext';
import { fetchProducts, getCartAtLocalStorage } from '../utils/products';

const ProductsPage = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productCart, setProductCart } = useContext(ProductContext);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then((data) => setProducts(data));
    setIsLoading(false);
    getCartAtLocalStorage(setProductCart);
  }, [setProductCart]);

  useEffect(() => () => {
    setProducts(null);
    setIsLoading(false);
  }, [productCart]);

  if (!userData.name) return <Redirect to="/login" />;
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
