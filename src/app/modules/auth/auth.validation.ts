import z from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: ' name is required',
    }),
    email: z
      .string({
        required_error: ' email is required',
      })
      .email(),
    password: z.string({
      required_error: ' password is required',
    }),
    // role: z.enum(['admin', 'customer']),
    contactNo: z.string({
      required_error: ' contactNo is required',
    }),
    address: z.string({
      required_error: ' address is required',
    }),
    //   profileImg: z.string().url(),
    profileImg: z.string({
      required_error: ' profile img is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    // role: z.enum(['admin', 'customer']).optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
    // profileImg: z.string().url().optional(),
  }),
});

export const AuthValidation = {
  create,
  update,
};
