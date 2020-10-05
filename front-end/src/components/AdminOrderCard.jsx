import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard(props) {
  const { id, address, totalPrice, status } = props;
  return (
    <div>
      <Link to={`/admin/orders/${id}`}>
        <h2 data-testid={`${id - 1}-order-number`}>{`Pedido ${id}`}</h2>
        <p data-testid={`${id - 1}-order-address`}>{`${address}`}</p>
        <div>
          <p data-testid={`${id - 1}-order-total-value`}>
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </p>
          <p data-testid={`${id - 1}-order-status`}>{status}</p>
        </div>
      </Link>
    </div>
  );
}
