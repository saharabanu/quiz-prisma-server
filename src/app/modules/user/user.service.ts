import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

// get all user

const CreateUser2 = async () => {
  const postUser2 = await prisma.user1.create({
    data:{
      email:'abc@gmail.com',
      name:"abc"
    }
  });
  return postUser2
};
const getAllDataFromDb = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({
    include: {
      orders: true,
      reviews: true,
    },
  });

  return result;
};

// get a user by id

const getDataByIdFromDb = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      orders: true,
      reviews: true,
    },
  });

  return result;
};
// update user

const updateDataByIdFromDb = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },

    include: {
      orders: true,
      reviews: true,
    },
    data: payload,
  });

  return result;
};

// delete user

const deleteDataFromDb = async (id: string): Promise<User | null> => {
  await prisma.$transaction(async tx => {
    const findOrder = await tx.order.findMany({
      where: {
        userId: id,
      },
    });

    await Promise.all(
      findOrder.map(async order => {
        await tx.orderedBook.deleteMany({
          where: {
            orderId: order?.id,
          },
        });
      })
    );
    await tx.order.deleteMany({
      where: {
        userId: id,
      },
    });
  });
  const result = await prisma.user.delete({
    where: {
      id,
    },
    include: {
      orders: true,
      reviews: true,
    },
  });
  return result;
};



export const UserService = {
  CreateUser2,
  getAllDataFromDb,
  getDataByIdFromDb,
  updateDataByIdFromDb,
  deleteDataFromDb,
};
