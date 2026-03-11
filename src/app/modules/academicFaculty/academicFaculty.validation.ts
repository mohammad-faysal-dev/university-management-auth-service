import { z } from 'zod'
const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
  }),
})

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
}
