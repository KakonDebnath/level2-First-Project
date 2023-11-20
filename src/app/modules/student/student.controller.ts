import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentZodValidationSchema from './studentValidation';
// import studentValidationJoiSchema from './student.validationWithJoi';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    // validate with joi validation
    // const { error, value:studentData } = studentValidationJoiSchema.validate(student);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: `Something went wrong`,
    //     error: error.details,
    //   });
    // }

    // validate with zod validation
    const zodParseData = StudentZodValidationSchema.parse(student);

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: `Student created successfully`,
      data: result,
    });
  } 
  catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudent();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'Selected Student retrieved successfully',
      data: result,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
