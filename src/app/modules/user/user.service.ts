import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      contactNo: true,
      name: true,
      address: true,
      profileImg: true,
    },
  });
  return users;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      contactNo: true,
      name: true,
      address: true,
      profileImg: true,
    },
  });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const updateUserById = async (id: string, user: Partial<User>) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: user,
    select: {
      id: true,
      email: true,
      role: true,
      contactNo: true,
      name: true,
      address: true,
      profileImg: true,
    },
  });

  if (!updatedUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return updatedUser;
};

const deleteUserById = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      contactNo: true,
      name: true,
      address: true,
      profileImg: true,
    },
  });
  if (!deletedUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return deletedUser;
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
