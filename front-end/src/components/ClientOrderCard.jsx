import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertMySQLDatetime from '../utils/orders';

const OrderCard = ({
  index, id, saleDate, totalPrice,
}) => {
  const orderDayAndMonth = convertMySQLDatetime(saleDate);
  return (
    <div data-testid={ `${index}-order-card-container` }>
      <Link to={ `/orders/${id}` }>
        <h4 data-testid={ `${index}-order-number` }>
          Pedido nr.
          {id}
        </h4>
      </Link>
      <p data-testid={ `${index}-order-date` }>{orderDayAndMonth}</p>
      <p data-testid={ `${index}-order-total-value` }>{totalPrice}</p>
    </div>
  );
};

OrderCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default OrderCard;
