import { z } from 'zod';

const UserNameZodValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().min(1).max(20).optional(),
  lastName: z.string().min(1).max(20),
});

const GuardianZodValidationSchema = z.object({
  fatherName: z.string().min(1).max(20),
  fatherOccupation: z.string(),
  fatherContactNo: z.string().length(11),
  motherName: z.string().min(1).max(20),
  motherOccupation: z.string(),
  motherContactNo: z.string().length(11),
});

const LocalGuardianZodValidationSchema = z.object({
  name: z.string().min(1).max(20),
  contactNo: z.string().length(11),
  occupation: z.string(),
  address: z.string(),
});

const StudentZodValidationSchema = z.object({
  id: z.string(),
  name: UserNameZodValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string().length(11),
  emergencyContactNo: z.string().length(11),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianZodValidationSchema,
  localGuardian: LocalGuardianZodValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default StudentZodValidationSchema;
