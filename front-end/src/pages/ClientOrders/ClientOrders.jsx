import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import OrderCard from '../../components/OrderCard';
import { userOrders } from '../../services';

function ClientOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!user) return undefined;
    setIsFetching(true);
    userOrders(user.id).then(
      (response) => {
        setOrders(response);
        setIsFetching(false);
      },
      (response) => {
        setErrors(response);
        setIsFetching(false);
      },
    );
    return () => {
      setOrders(null);
      setErrors(null);
      setIsFetching(false);
    };
  }, [user]);

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <ClientNavBar title="Meus Pedidos" />
      {errors && <h4>{errors}</h4>}
      {!isFetching && orders && orders.map((order, index) => (
        <OrderCard
          key={ order.id }
          index={ index }
          id={ order.id }
          saleDate={ order.saleDate }
          totalPrice={ order.totalPrice }
        />
      ))}
    </div>
  );
}

export default ClientOrders;
