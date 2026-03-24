import { model, Schema } from 'mongoose'
import type {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface.js'

const AcademicDepartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema)
