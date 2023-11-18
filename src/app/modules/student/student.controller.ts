import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)
    // send response
    res.status(200).json({
      success: true,
      message: `Student created successfully`,
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudent()
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudent,
}
