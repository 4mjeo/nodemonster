import { BusinessLoigc } from "../shared/BusinessLogicInterface";
import { BadRequestError } from "../shared/exception";

type ValidationNumberParameter = (key: string) => BusinessLoigc;

const ValidationNumberParameter: ValidationNumberParameter = (key: string) => (req, res, next) => {
    const param = req.params[key];
    param && +param ? next() : next(new BadRequestError());
};

export { ValidationNumberParameter };