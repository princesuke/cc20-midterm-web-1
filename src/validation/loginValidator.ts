import { z } from "zod";

type Data = {
  username: string;
  password: string;
};

const loginSchema = z.object({
  username: z.string().min(6, { message: "Username must be at least 6 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const validateLogin = (data: Data) => {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.format();
    const error = {
      username: errors.username?._errors[0] || "",
      password: errors.password?._errors[0] || "",
    };
    return { error: true, errors: error };
  }
  return { error: false, data: result.data };
};

export default validateLogin;
