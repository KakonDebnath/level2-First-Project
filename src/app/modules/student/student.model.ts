import { Schema, model } from 'mongoose';
// import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods, // form instance methods
  StudentModel,
  TUserName,
} from './student.interface';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, "max length can't be more then 20 characters"],
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameString === value;
    //   },
    //   message:
    //     '{VALUE} is not in capitalized format. You Should use Capitalize Format.',
    // },
  },
  middleName: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: 20,
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     return validator.isAlpha(value);
    //   },
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    maxlength: 11,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
    maxlength: 11,
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
    maxlength: 11,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
  },
});

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({  //for creating instances methods
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: [20, 'Password cannot be more than 20 characters'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: function (value: string) {
    //     return validator.isEmail(value);
    //   },
    //   message: 'Please enter a valid email address',
    // },
  },
  contactNo: {
    type: String,
    required: true,
    maxlength: 11,
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
    maxlength: 11,
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: { type: Boolean, default: false}
});

// creating a instance  method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// pre save() middleware / hooks
studentSchema.pre('save', async function (next) {
  // console.log(this, "pre save data ");
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Post save() middleware / hooks
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// // query middleware / hooks

// studentSchema.pre('find', function (next) {
//   console.log(this);
// });
// creating a static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
