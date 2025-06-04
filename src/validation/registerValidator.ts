import { z } from "zod";

type Data = {
  username: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = z
  .object({
    username: z.string().min(6, { message: "Username must be at least 6 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const validateRegister = (data: Data) => {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.format();
    const error = {
      username: errors.username?._errors[0] || "",
      password: errors.password?._errors[0] || "",
      confirmPassword: errors.confirmPassword?._errors[0] || "",
    };
    return { error: true, errors: error };
  }
  return { error: false, data: result.data };
};

export default validateRegister;
