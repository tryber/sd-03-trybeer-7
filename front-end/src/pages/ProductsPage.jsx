import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import ProductContext from '../context/ProductContext';

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productCart } = useContext(ProductContext);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await fetch('http://localhost:3001/products/all');
      const json = await result.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      return (error.message);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
  }, [products, productCart]);

  return isLoading ? <h1>Carregando...</h1> : (
    <div>
      { Array.isArray(products)
        ? products.map((product) => <ProductCard key={ product.name } product={ product } />)
        : null}
    </div>
  );
};

export default ProductsPage;
