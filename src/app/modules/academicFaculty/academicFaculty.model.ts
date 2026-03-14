import { model, Schema } from 'mongoose'
import type {
  FacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface.js'

const facultySchema = new Schema<IAcademicFaculty>({
  title: {
    type: String,
  },
})
export const AcademicFaculty = model<IAcademicFaculty, FacultyModel>(
  'AcademicFaculty',
  facultySchema,
)
