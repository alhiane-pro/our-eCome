import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email address is required!" }).email(),
  password: z.string().min(1, { message: "Password address is required!" }),
});

type TLoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type TLoginSchema };
