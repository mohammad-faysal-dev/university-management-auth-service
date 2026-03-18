import z from 'zod'

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    academicFaculty: z.string().min(1, 'Academic Faculty is required'),
  }),
})
export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
}
