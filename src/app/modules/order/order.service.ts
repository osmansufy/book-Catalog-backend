import { EnumOrderStatus, EnumRole } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

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

const getAllOrders = async (userId: string, userRole: EnumRole) => {
  if (userRole === EnumRole.ADMIN) {
    return await prisma.order.findMany({
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
  } else if (userRole === EnumRole.CUSTOMER) {
    return await prisma.order.findMany({
      where: {
        userId: userId,
      },
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
  }
};

const getSingleOrder = async (
  orderId: string,
  userId: string,
  userRole: EnumRole,
) => {
  if (userRole === EnumRole.ADMIN) {
    return await prisma.order.findUnique({
      where: {
        id: orderId,
      },
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
  } else if (userRole === EnumRole.CUSTOMER) {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: userId,
      },
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
    if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    return order;
  }
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
