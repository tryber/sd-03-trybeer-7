import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard(props) {
    const {id,address,totalPrice,status} = props;
    return (
        <div>
            <Link to={`/admin/orders/${id}`}>
                <h2 data-testid={`${id-1}-order-number`}>{`Pedido ${id}`}</h2>
                <p data-testid={`${id-1}-order-address`} >{`${address}`}</p>
                <div>
                    <p data-testid={`${id-1}-order-total-value`} >
                      R$ {totalPrice.toFixed(2).replace('.',',')}
                    </p>
                    <p data-testid={`${id-1}-order-status`}>{status}</p>
                </div>
            </Link>
        </div>
    )
};
/*import PropTypes from 'prop-types';

const initialFloat = 2;

// Baseado em: https://stackoverflow.com/questions/3075577/convert-mysql-datetime-stamp-into-javascripts-date-format
const convertMySQLDatetime = (date = '') => {
  const initialDateIndex = 5;
  const finalDateIndex = 10;
  const extractDayAndMonth = date.slice(initialDateIndex, finalDateIndex).split('-').reverse()
    .join('/');
  return extractDayAndMonth;
};

const OrderCard = ({
  index, id, saleDate, totalPrice,
}) => {
  const orderDayAndMonth = convertMySQLDatetime(saleDate);
  return (
    <div data-testid={ `${index}-order-card-container` }>
      <Link to={ `/orders/${id}` }>
        <h4 data-testid={ `${index}-order-number` }>
          {`Pedido ${id}`}
        </h4>
      </Link>
      <p data-testid={ `${index}-order-date` }>{orderDayAndMonth}</p>
      <p data-testid={ `${index}-order-total-value` }>{`R$ ${(totalPrice).toFixed(initialFloat).replace('.', ',')}`}</p>
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
*/
