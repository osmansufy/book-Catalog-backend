import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getUserProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const profile = await ProfileService.getUserProfile(user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: profile,
  });
});

export const ProfileController = {
  getUserProfile,
};
