import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AdminNavBar from '../components/NavBar/AdminBar/AdminNavBar';
import { orderDetails } from '../services';

export default function OrderDetailsPage() {
    const [sale, setSale] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setIsLoading(true);
        userOrders().then((data) => setSale(data));
        setIsLoading(false);
      }, []);

    if (!userData || userData.role === 'client') return <Redirect to="/login" />;

    return isLoading ? <h1>Carregando...</h1> : (
        <div>
            <AdminNavBar title="TryBeer" />
            <div>
                <h1>Pedido <span data-testid='order-number'>{sale.saleID}</span>
                - <span data-testid='order-status'>{sale.status}</span></h1>
                <div>
                    {sale ? sale.products.map((ele,i) => <li>
                    <span data-testid={`${i}-product-qtd`}>{ele.soldQuantity}</span>
                    <span data-testid={`${i}-product-name`}>{ele.productName}</span>
                    <span data-testid={`${i}-product-total-value`}>
                        {ele.productPrice * ele.soldQuantity}
                    </span>
                    </li>) : <p>Loading...</p>}
                    <p data-testid='order-total-value'>Total: R${sale.orderValue.toFixed(2)}</p>
                </div>
                <button>Marcar como entregue</button>
            </div>
        </div>
    )
};
