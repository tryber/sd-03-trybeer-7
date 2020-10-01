import React from 'react';
import { useParams } from 'react-router-dom';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import pedido from './mockOrder';

const allProductsNames = pedido.sale.products.map((item) => item);
const saleDate = pedido.sale.saleDate;
const sqlDate = new Date(saleDate);
const now = (sqlDate.getMonth() + 1) + '/' + sqlDate.getDate();
console.log(allProductsNames)
console.log('data agora',now)

function OrderDetail() {
  // const { id } = useParams();

  return (
    <div>
      <ClientNavBar title="Detalhes de Pedido" />
      <div style={{ width: '360px' }}>
        <h3 data-testid="order-number">{`Pedido ${pedido.sale.saleID}`}</h3>
        <p data-testid="order-date">{now}</p>
      </div>
      {pedido.sale.products.map((order, index) => {
        return (
          <div key={index} style={{ width: '360px', border: '1px solid black' }}>
            <p data-testid={`${index + 1}-product-qtd`}>{`${order.solQuantity}`}</p>
            <p data-testid={`${index + 1}-product-name`}>{`${order.productName}`}</p>
            <p data-testid={`${index + 1}-product-total-value`}>{`${order.productPrice}`}</p>
            <p data-testid="order-total-value">{`Total: R$${order.solQuantity * order.productPrice}`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default OrderDetail;
