import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

export const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await AuthService.signUpUser(userData);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...newUserWithoutPassword } = user;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: newUserWithoutPassword,
  });
});

const signInUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const userToken = await AuthService.SignInUser(userData);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signin successfully!',
    token: userToken,
  });
});

// profile
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getUserProfile(req.user);
  res.send({
    statusCode: 200,
    success: true,
    message: 'User profile information retrieved  Successfully',
    data: result,
  });
});

export const AuthController = {
  signUpUser,
  signInUser,
  getUserProfile,
};
