import { EnumRole, User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { JwtHelpers } from '../../../helpers/JwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: User) => {
  // hash password before saving to db
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  // role convert to uppercase

  user.role = user.role.toUpperCase() as EnumRole;
  // don't send password in response
  const newUser = await prisma.user.create({
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

  return newUser;
};
const login = async (user: { email: string; password: string }) => {
  const isExistingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!isExistingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordValid = await bcrypt.compare(
    user.password,
    isExistingUser.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const accessToken = JwtHelpers.createToken(
    { id: isExistingUser.id, role: isExistingUser.role },
    config.jwt.secret as Secret,
    config.jwt.expiration as string,
  );

  return { accessToken };
};

export const AuthService = {
  createUser,
  login,
};
