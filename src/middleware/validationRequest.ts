import Joi from 'joi';
import { BusinessLoigc } from '../shared/BusinessLogicInterface';
import { BadRequestError } from '../shared/exception';

type ValidationRequest = <T>(schema: Joi.ObjectSchema<T>) => BusinessLoigc;

const validationRequest: ValidationRequest = 
    <T>(schema: Joi.ObjectSchema<T>) => 
    (req, res, next) => {
        const { error } = schema.validate(req.body);
        error ? next(new BadRequestError()) : next();
    };

export { validationRequest };