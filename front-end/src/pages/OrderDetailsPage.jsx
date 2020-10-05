import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AdminNavBar from '../components/NavBar/AdminBar/AdminNavBar';
import { orderFinished } from '../services';

export default function OrderDetailsPage() {
    const [sale, setSale] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(true);
    const userData = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams();
    const url = `http://localhost:3001/sales/search/${id}`;
    const getDetails = async () => {
      try {
        const result = await fetch(url);
        const json = await result.json();
        console.log(json.sale);
        return setSale(json.sale);
      } catch (error) {
        return error.message;
      }
    };

    const alterStatus = (id, status) => {
        status = "Entregue";
        return orderFinished(id, status);
    };

    useEffect(() => {
        getDetails();
        setIsLoading(false);
      }, []);
    
    useEffect(() => {
        if(sale.status === "Entregue") setPending(false);
    }, [sale.status, pending]);

    if (!userData) return <Redirect to="/login" />;

    return isLoading || !sale ? <h1>Carregando...</h1> : (
        <div>
            <AdminNavBar title="TryBeer" />
            <div>
                <h1>Pedido <span data-testid='order-number'>{sale.saleID ? sale.saleID : ''}</span>
                - <span data-testid='order-status'>{sale.status ? sale.status : ''}</span></h1>
                <div>
                    {sale.products ? sale.products.map((ele,i) => <li>
                    <span data-testid={`${i}-product-qtd`}>{ele.soldQuantity}</span>
                    <span data-testid={`${i}-product-name`}>{ele.productName}</span>
                    <span data-testid={`${i}-product-total-value`}>
                        {ele.productPrice * ele.soldQuantity}
                    </span>
                    </li>) : <p>Loading...</p>}
                    <p data-testid='order-total-value'>
                        Total: R$ {sale.orderValue ? sale.orderValue.toFixed(2).replace('.',',') : ''}
                    </p>
                </div>
                {pending ? <button onClick={() => alterStatus(id, sale.status)} >Marcar como entregue</button> : ''}
            </div>
        </div>
    )
};
