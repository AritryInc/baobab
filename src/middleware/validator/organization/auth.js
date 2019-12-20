import Joi from '@hapi/joi';
import Async from '../../../utils/async-wrapper';

export const signup = Async(async (req, res, next) => {
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

  req.body = await schema.validateAsync(req.body, { abortEarly: false });

  return next();
});

export const signin = (req, res, next) => signup(req, res, next);
