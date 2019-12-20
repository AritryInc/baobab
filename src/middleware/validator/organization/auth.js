import Joi from '@hapi/joi';
import { transformJoiError } from '../../../utils/validation';

export const signup = (req, res, next) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .email()
      .message('please provide a valid email')
      .required()
      .messages({ 'string.empty': 'email cannot be empty' }),
    password: Joi
      .string()
      .ruleset
      .min(4)
      .max(16)
      .message('password must be between 4 and 16 characters')
      .required()
      .messages({ 'string.empty': 'provide a password' }),
    organizationId: Joi
      .string()
      .pattern(/org_\w{16}/)
      .message('organization id is invalid')
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

export const signin = (req, res, next) => signup(req, res, next);
