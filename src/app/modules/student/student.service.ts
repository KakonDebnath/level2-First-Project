import { Student } from './student.model';
import { TStudent } from './student.interface';

// create a new student
const createStudentIntoDB = async (studentData: TStudent) => {
  //  instance method
  // const student = new Student(studentData);

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error(`This user has already been exists`);
  // }

  // const result = student.save();

  // statics methods

  if (await Student.isUserExists(studentData.id)) {
    throw new Error(`this user has already been created`);
  }
  //build in static method
  const result = await Student.create(studentData);
  return result;
};

// get all students from the database
const getAllStudent = async () => {
  const result = await Student.find(); //build in static method
  return result;
};

// get single student by id
const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id }); //build in static method
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudent,
  getSingleStudent,
};
