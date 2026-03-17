import { z } from 'zod'
const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
  }),
})

const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
  }),
})

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
}
