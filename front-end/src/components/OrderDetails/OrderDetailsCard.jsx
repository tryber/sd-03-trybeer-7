import React from 'react';

const initialFloat = 2;

function OrderDetailsCard({ object, date }) {
  return (
    <div>
      <div style={ { width: '360px' } }>
        <h3 data-testid="order-number">{`Pedido ${object.saleID}`}</h3>
        <p data-testid="order-date">{date}</p>
      </div>
      {object.products
        && object.products.map((order, index) => (
          <div key={ index } style={ { width: '360px', border: '1px solid black' } }>
            <p data-testid={ `${index}-product-qtd` }>{`${order.soldQuantity}`}</p>
            <p data-testid={ `${index}-product-name` }>{`${order.productName}`}</p>
            <p data-testid={ `${index}-product-total-value` }>{`R$ ${order.productPrice.toFixed(initialFloat).replace('.', ',')}`}</p>
            <p data-testid="order-total-value">
              {`Total: R$  ${
                (order.soldQuantity * order.productPrice).toFixed(initialFloat).replace('.', ',')
              }`}
            </p>
          </div>
        ))}
    </div>
  );
}

export default OrderDetailsCard;