import { rest } from 'msw';
import { setupServer } from 'msw/node';
import getAllProductsResponse from './mockedResponses/GetAllProductsRes';

const server = setupServer(
  rest.get('/products/all',
    (req, res, ctx) => res(ctx.json({ getAllProductsResponse }))),
);

export default server;
