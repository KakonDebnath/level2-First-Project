 
 import Joi from "joi";
 // create a schema validation using joi

 const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(20)
      .trim()
      .pattern(/^[A-Z][a-z]*$/, 'capitalize')
      .message('{#level} must start with an uppercase letter and followed by lowercase letters'),
    middleName: Joi.string().max(20).trim(),
    lastName: Joi.string()
      .required()
      .max(20)
      .trim()
      .pattern(/^[A-Za-z]+$/, "alpha")
      .message('{#level} must only contain alphabetical characters')
  });
  
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required().max(11).trim(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required().max(11).trim(),
  });
  
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    contactNo: Joi.string().required().max(11).trim(),
    address: Joi.string().required(),
  });
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().required().email(),
    contactNo: Joi.string().required().max(11).trim(),
    emergencyContactNo: Joi.string().required().max(11).trim(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

  export default studentValidationSchema;