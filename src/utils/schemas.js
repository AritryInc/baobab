import Joi from 'joi';

export const authSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    organization: Joi.string()
});

