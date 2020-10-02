import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClientNavBar from '../../components/NavBar/ClientBar/ClientNavBar';
import OrderDetailsCard from '../../components/OrderDetails/OrderDetailsCard';

function OrderDetail() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const saleDate = details.saleDate;
  const sqlDate = new Date(saleDate);
  const sqlFormattedDate = sqlDate.getDate() + '/' + (sqlDate.getMonth() + 1);

  const loadingFunc = () => {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  };

  const { id } = useParams();
  const url = `http://localhost:3001/sales/search/${id}`;
  const getDetails = async (setDetails) => {
    try {
      const result = await fetch(url);
      const json = await result.json();
      console.log(json.sale);
      return setDetails(json.sale);
    } catch (error) {
      return error.message;
    }
  };

  const requestDetails = async () => await getDetails(setDetails);

  useEffect(() => {
    if (details.saleID) return undefined;
    requestDetails();
    setLoading(false);
  }, [requestDetails, details.saleID]);

  return (
    <div>
      <ClientNavBar title="Detalhes de Pedido" />
      {loading && loadingFunc()}
      {!loading && <OrderDetailsCard object={details} date={sqlFormattedDate} />}
    </div>
  );
}

export default OrderDetail;
