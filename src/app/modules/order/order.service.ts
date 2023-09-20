import { EnumOrderStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (
  order: {
    orderedBooks: { bookId: string; quantity: number }[];
  },
  userId: string,
) => {
  const orderData = {
    userId,
    status: EnumOrderStatus.PENDING,
    orderedBooks: {
      create: order.orderedBooks,
    },
  };
  return await prisma.order.create({
    data: orderData,
    select: {
      id: true,
      userId: true,
      status: true,
      createdAt: true,
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true,
        },
      },
    },
  });
};

export const OrderService = {
  createOrder,
};
