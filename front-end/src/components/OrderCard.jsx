import React from 'react';
import PropTypes from 'prop-types';

// Baseado em: https://stackoverflow.com/questions/3075577/convert-mysql-datetime-stamp-into-javascripts-date-format
const convertMySQLDatetime = (datetime) => {
  const initialDateIndex = 5;
  const finalDateIndex = 10;
  const convertDate = new Date(datetime);
  const dayAndMonthExtract = convertDate.toISOString().slice(initialDateIndex, finalDateIndex).split('-').reverse()
    .join('/');
  return dayAndMonthExtract;
};

const OrderCard = ({
  index, id, saleDate, totalPrice,
}) => {
  const orderDayAndMonth = convertMySQLDatetime(saleDate);
  return (
    <div data-testid={ `${index}-order-card-container` }>
      <h4 data-testid={ `${index}-order-number` }>
        Pedido nr.
        {id}
      </h4>
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