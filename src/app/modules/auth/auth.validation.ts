import z from 'zod'

const loginZodSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'Id is required'),
    password: z.string().min(1, 'Password is required'),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: {
      required_error: 'Refresh Token is required',
    },
  }),
})

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
}
