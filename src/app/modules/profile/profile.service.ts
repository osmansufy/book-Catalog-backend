import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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

export const ProfileService = {
  getUserProfile,
};
