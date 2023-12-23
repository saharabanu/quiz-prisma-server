import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

// get all users
const getAllDataFromDb: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllDataFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All Users retrieved successfully',
    data: result,
  });
});

// get single user
const getDataByIdFromDb: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getDataByIdFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single User retrieved successfully',
    data: result,
  });
});
const updateDataByIDFromDb: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateDataByIdFromDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '  User Updated successfully',
    data: result,
  });
});
const deleteDataFromDb: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteDataFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User deleted successfully',
    data: result,
  });
});
const createUser2: RequestHandler = catchAsync(async (req, res) => {
  
  const result = await UserService.CreateUser2();
  console.log(result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User created successfully',
    data: result,
  });
});



export const UserController = {
  getAllDataFromDb,
  getDataByIdFromDb,
  updateDataByIDFromDb,
  deleteDataFromDb,
  createUser2
};
