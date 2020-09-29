import React from 'react';
import AdminNavBar from '../components/NavBar/AdminBar/AdminNavBar';
import OrderCard from '../components/OrderCard';

const mocker = [
    {
        orderNum: '1',
        addressStreet: 'rua dos bobos',
        addressNum: '0',
        totalPrice: '15.83',
        status: 'Pendente',
    },
    {
        orderNum: '2',
        addressStreet: 'rua dos bobos',
        addressNum: '1',
        totalPrice: '11.11',
        status: 'Entregue',
    }
];

export default function OrdersPage() {
    return (
        <div>
            <AdminNavBar title="Meu perfil" />
            <div>
                <h1>Pedidos pendentes</h1>
                <div>
                    {mocker.map((ele, index)  => {
                        <OrderCard
                        orderNum={ele.orderNum} 
                        address={ele.addressStreet+','+ele.addressNum}
                        totalPrice={ele.totalPrice}
                        status={ele.status}
                        index={index}
                        />
                    })}
                </div>
            </div>
        </div>
    )
};
