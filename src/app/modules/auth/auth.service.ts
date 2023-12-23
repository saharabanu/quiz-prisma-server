/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { user } from './auth.interface';

const signUpUser = async (userData: User): Promise<User> => {
  // Check if the email is already registered
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData?.email,
    },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already in use');
  }

  // Hash the user password
  const hashedPassword = await bcrypt.hash(userData?.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
    
  });

  return newUser;
};

export const SignInUser = async (userCredential: {
  email: string;
  password: string;
}): Promise<string> => {
  // check user
  const existUser = await prisma.user.findUnique({
    where: {
      email: userCredential?.email,
    },
  });

  if (!existUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email does not exist!');
  }

  const isPasswordMatched = await bcrypt.compare(
    userCredential?.password,
    existUser?.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect!');
  }

  // create token
  const Token = jwtHelpers.createToken(
    // { role: existUser?.role, userId: existUser?.id },
    { userId: existUser?.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return Token;
};

// profile

const getUserProfile = async (token: any): Promise<user | null> => {
  // const { role, userId } = token;
  const {  userId } = token;
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
      // role,
    },

    select: {
      id: true,
      name: true,
      email: true,
      // role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  return result;
};

export const AuthService = {
  signUpUser,
  SignInUser,
  getUserProfile,
};
