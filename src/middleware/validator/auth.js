import Joi from '@hapi/joi';
import { transformJoiError } from '../../utils/validation';

export const signUp = (req, res, next) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .email()
      .message('please provide a valid email')
      .required()
      .messages({ 'string.empty': 'email cannot be empty' }),
    organization: Joi
      .string()
      .ruleset
      .min(4)
      .max(20)
      .message('organization must be between 4 and 20 characters')
      .required()
      .messages({ 'string.empty': 'provide an organization ID' }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: 'validation errors',
      error: transformJoiError(error),
    });
  }

  return next();
};
