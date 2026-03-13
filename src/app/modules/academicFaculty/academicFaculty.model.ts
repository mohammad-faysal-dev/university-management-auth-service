import { model, Schema } from 'mongoose'
import type { IAcademicFaculty } from './academicFaculty.interface.js'

const facultySchema = new Schema<IAcademicFaculty>({
  title: {
    type: String,
  },
})
export const AcademicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  facultySchema,
)
