import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import OrderCard from '../../components/OrderCard';

function ClientOrders() {
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [input])

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <ClientNavBar title="Meus Pedidos" />
      {orders.map((order, index) => (
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
