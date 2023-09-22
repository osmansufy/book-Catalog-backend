import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await OrderService.createOrder(req.body, user?.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const orders = await OrderService.getAllOrders(user?.id, user?.role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await OrderService.getSingleOrder(
    req.params.id,
    user?.id,
    user?.role,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
