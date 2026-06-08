import z from 'zod'

const loginZodSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'Id is required'),
    password: z.string().min(1, 'Password is required'),
  }),
})

export const AuthValidation = {
  loginZodSchema,
}
