import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard(props) {
    const {orderNum,address,totalPrice,status,index} = props;
    console.log(orderNum,address,totalPrice,status,index);
    return (
        <div>
            <Link to={`/admin/orders/${index}`}>
                <h2 data-testid={`${index}-order-number`}>{`Pedido ${orderNum}`}</h2>
                <p data-testid={`${index}-order-address`} >{`${address}`}</p>
                <div>
                    <p data-testid={`${index}-order-total-value`} >{totalPrice}</p>
                    <p>{status}</p>
                </div>
            </Link>
        </div>
    )
};
