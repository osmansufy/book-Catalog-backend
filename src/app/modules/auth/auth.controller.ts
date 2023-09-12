import { Request, Response } from 'express';
import { UserService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log('req.body', req.body);
  const newUser = await UserService.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});

export const UserController = {
  createUser,
};
