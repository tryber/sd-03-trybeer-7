import React from 'react';

export default function OrderCard(orderNum,address,totalPrice,status,index) {
    return (
        <div>
            <h2 data-testid={`${index}-order-number`}>Pedido {orderNum}</h2>
            <p data-testid={`${index}-order-address`} >{address}</p>
            <div>
                <p data-testid={`${index}-order-total-value`} >{totalPrice}</p>
                <p>{status}</p>
            </div>
        </div>
    )
};
