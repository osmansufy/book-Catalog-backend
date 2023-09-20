import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await OrderService.createOrder(req.body, user?.id);
  res.status(httpStatus.CREATED).send(order);
});

export const OrderController = {
  createOrder,
};
