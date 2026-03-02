import { z } from 'zod'
import { academicSemesterMonths } from './academicSemester.constant.js'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall']),
    year: z.string().refine(val => val !== undefined, {
      message: 'Year is required',
    }),
    code: z.enum(['01', '02', '03']),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]),
  }),
})
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
      year: z
        .string()
        .refine(val => val !== undefined, {
          message: 'Year is required',
        })
        .optional(),
      code: z.enum(['01', '02', '03']).optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]])
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]])
        .optional(),
    }),
  })
  .refine(
    data => (data.body.title && data.body.code) || (!data.body.title && !data),
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
