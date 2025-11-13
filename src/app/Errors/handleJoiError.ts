import Joi from 'joi';

const handleJoiError = (err: Joi.ValidationError) => {
  const statusCode = 400;

  const errorMessages = err.details.map((detail) => {
    return detail.message.replace(/['"]/g, '');
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleJoiError;
