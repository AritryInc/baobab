import Joi from 'joi';
import { authSchema } from '../utils/schemas';

const validator = (input, schema, res, next) => {
    const { error } = Joi.validate(input, schema, {
        abortEarly: false,
        language: {
            key: '{{key}}',
        },
    });
    if (error) {
        const validationError = error.details.map(errorKey => errorKey.message);
        return res.json({
            status: 422,
            validationError
        })
    }
    next();
}

export const authValidator = (req, res, next) => {
    validator(req.body, authSchema, res, next);
}
