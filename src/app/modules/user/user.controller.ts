import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User fetched successfully',
    data: user,
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const updatedUser = await UserService.updateUserById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const deleteUserById = catchAsync(async (req, res) => {
  const deletedUser = await UserService.deleteUserById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: deletedUser,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
