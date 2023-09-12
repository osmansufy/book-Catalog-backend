import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createUser = async (user: User) => {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};

export const UserService = {
  createUser,
};
