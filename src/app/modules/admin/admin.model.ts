import { model, Schema } from 'mongoose'
import type { adminModel, IAdmin } from './admin.interface.js'

const adminSchema = new Schema<IAdmin>({
  id: {
    type: String,
    required: [true, 'Admin ID is required'],
    unique: true,
  },
  name: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  dateOfBirth: {
    type: String,
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  profileImage: {
    type: String,
  },
  managementDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'ManagementDepartment',
    required: [true, 'Management department is required'],
  },
})

export const Admin = model<IAdmin, adminModel>('Admin', adminSchema)
