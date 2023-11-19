import { StudentModel } from './student.model';
import { Student } from './student.interface';

// create a new student
const createStudentIntoDB = async (studentData: Student) => {
  //build in static method
  // const result = await StudentModel.create(student);

  // build in instance method
  const student = new StudentModel(studentData);
  const result = student.save();

  return result;
};

// get all students from the database
const getAllStudent = async () => {
  const result = await StudentModel.find(); //build in static method
  return result;
};

// get single student by id
const getSingleStudent = async (id: string) => {
  const result = await StudentModel.findOne({ id }); //build in static method
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudent,
  getSingleStudent,
};
