import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string().min(1, 'First name is required'),
        middleName: z.string().optional(),
        lastName: z.string().min(1, 'Last name is required'),
      }),
      dateOfBirth: z.string().min(1, 'Date of birth is required'),
      gender: z.enum(['male', 'female']),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      email: z.email({ error: 'Invalid email address' }).min(1, {
        error: 'Email is required',
      }),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      academicSemester: z.string().min(1, 'Academic semester is required'),
      academicDepartment: z.string().min(1, 'Academic department is required'),
      academicFaculty: z.string().min(1, 'Academic faculty is required'),
      guardian: z.object({
        fatherName: z.string().min(1, 'Father name is required'),
        fatherOccupation: z.string().min(1, 'Father occupation is required'),
        fatherContactNo: z.string().min(1, 'Father contact number is required'),
        motherName: z.string().min(1, 'Mother name is required'),
        motherOccupation: z.string().min(1, 'Mother occupation is required'),
        motherContactNo: z.string().min(1, 'Mother Contact number is required'),
        address: z.string().min(1, 'Address is required'),
      }),
      localGuardian: z.object({
        name: z.string().min(1, 'Local guardian is required'),
        occupation: z.string().min(1, 'Local guardian occupation is required'),
        contactNo: z
          .string()
          .min(1, 'Local guardian contact number is required'),
        address: z.string().min(1, 'Local guardian address is required'),
      }),
      profileImage: z.string().optional(),
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
