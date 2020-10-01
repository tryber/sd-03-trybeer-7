const mockOrder = {
  sale: {
    saleID: 1,
    userID: 2,
    orderValue: 19.4,
    deliveryAddress: 'rua da trybe',
    deliveryNumber: '22',
    saleDate: '2020-09-30T16:14:01.000Z',
    status: 'Pendente',
    products: [
      {
        soldProductID: 1,
        solQuantity: '2',
        productName: 'Skol Lata 250ml',
        productPrice: 2.2,
        productImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
      },
      {
        soldProductID: 2,
        solQuantity: '2',
        productName: 'Heineken 600ml',
        productPrice: 7.5,
        productImage: 'http://localhost:3001/images/Heineken 600ml.jpg',
      },
    ],
  },
};

export default mockOrder;
