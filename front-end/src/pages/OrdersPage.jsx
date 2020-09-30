import React from 'react';
import AdminNavBar from '../components/NavBar/AdminBar/AdminNavBar';
import OrderCard from '../components/OrderCard';
import { ordersList } from '../services';

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
    const [sales, setSales] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setIsLoading(true);
        ordersList().then((data) => setSales(data));
        setIsLoading(false);
      }, [setSales]);

    if (!userData || userData.role === 'client') return <Redirect to="/login" />;

    return isLoading ? <h1>Carregando...</h1> : (
        <div>
            <AdminNavBar title="TryBeer" />
            <div>
                <h1>Pedidos pendentes</h1>
                <div>
                    {sales.map((ele, index)  => <OrderCard
                        orderNum={ele.id} 
                        address={ele.delivery_address+','+ele.delivery_number}
                        totalPrice={ele.total_price}
                        status={ele.status}
                        key={index}
                        />
                    )}
                </div>
            </div>
        </div>
    )
};
