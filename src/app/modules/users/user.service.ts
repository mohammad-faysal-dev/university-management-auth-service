import mongoose from 'mongoose'
import config from '../../../config/index.js'
import ApiError from '../../../errors/ApiError.js'
import { AcademicSemester } from '../academicSemester/academicSemesterModel.js'
import type { IStudent } from '../student/student.interface.js'
import type { IUser } from './user.interface.js'
import { User } from './user.model.js'
import { generateStudentId, generateFacultyId } from './user.utils.js'
import { Student } from '../student/student.modal.js'
import type { TFaculty } from '../faculty/faculty.interface.js'
import { Faculty } from '../faculty/faculty.model.js'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
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
    const [newStudent] = await Student.create([student], { session })
    if (!newStudent) {
      throw new ApiError(400, 'Failed to create student')
    }
    user.student = newStudent._id

    const [newUser] = await User.create([user], { session })
    if (!newUser) {
      throw new ApiError(400, 'Failed to create user')
    }
    newUserAllData = newUser

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

const createFaculty = async (
  faculty: TFaculty,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_password as string
  }
  user.role = 'faculty'
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateFacultyId()
    user.id = id
    faculty.id = id

    const [newFaculty] = await Faculty.create([faculty], { session })
    if (!newFaculty) {
      throw new ApiError(400, 'Failed to create faculty')
    }
    user.faculty = newFaculty._id

    const [newUser] = await User.create([user], { session })
    if (!newUser) {
      throw new ApiError(400, 'Failed to create user')
    }
    newUserAllData = newUser

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
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
  createFaculty,
}
