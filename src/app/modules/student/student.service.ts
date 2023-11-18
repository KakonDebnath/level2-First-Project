import { StudentModel } from './student.model'
import { Student } from './student.interface'

// create a new student
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

// get all students from the database
const getAllStudent = async () => {
  const result = await StudentModel.find()
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudent,
}
