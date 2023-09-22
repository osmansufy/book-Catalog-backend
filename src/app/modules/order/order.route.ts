import express from 'express';
import { EnumRole } from '@prisma/client';
import auth from '../../middlewares/authHandler';
import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  auth(EnumRole.CUSTOMER),
  OrderController.createOrder,
);

router.get(
  '/',
  auth(EnumRole.ADMIN, EnumRole.CUSTOMER),
  OrderController.getAllOrders,
);

router.get(
  '/:id',
  auth(EnumRole.ADMIN, EnumRole.CUSTOMER),
  OrderController.getSingleOrder,
);

export const orderRoutes = router;
