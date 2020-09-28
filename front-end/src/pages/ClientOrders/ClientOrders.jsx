import React from 'react';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';

function ClientOrders() {
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <ClientNavBar title="Meus Pedidos" />

    </div>
  );
}

export default ClientOrders;
