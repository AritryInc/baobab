import Joi from '@hapi/joi';
import Async from '../../utils/async-wrapper';

export const signUp = Async(async (req, res, next) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .trim()
      .email()
      .message('please provide a valid email')
      .required()
      .messages({ 'string.empty': 'email cannot be empty' }),
    organization: Joi
      .string()
      .trim()
      .ruleset
      .min(4)
      .max(20)
      .message('organization must be between 4 and 20 characters')
      .required()
      .messages({ 'string.empty': 'provide an organization ID' }),
  });

  req.body = await schema.validateAsync(req.body, { abortEarly: false });

  return next();
});
