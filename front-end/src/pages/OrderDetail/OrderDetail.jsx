import React from 'react';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';

function OrderDetail(order, product) {
  return (
    <div>
      <ClientNavBar title="Exemplo" />
      <div>
        <h3>{`Pedido ${order}`}</h3>
        <p>{`${product.quantity} -- ${product.name} -- ${product.price}`}</p>
        <p>{`Total: R$${product.quantity * product.price}`}</p>
      </div>
    </div>
  );
}

export default OrderDetail;
