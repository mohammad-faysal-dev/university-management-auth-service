import mongoose from 'mongoose'
import config from '../../../config/index.js'
import ApiError from '../../../errors/ApiError.js'
import { AcademicSemester } from '../academicSemester/academicSemesterModel.js'
import type { IStudent } from '../student/student.interface.js'
import type { IUser } from './user.interface.js'
import { User } from './user.model.js'
import { generateStudentId } from './user.utils.js'
import { Student } from '../student/student.modal.js'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null | undefined> => {
  if (!user.password) {
    user.password = config.default_student_password as string
  }
  user.role = 'student'
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id
    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(400, 'Failed to create student')
    }
    user.student = newStudent[0]?._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(400, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}

export const UserService = {
  createStudent,
}
