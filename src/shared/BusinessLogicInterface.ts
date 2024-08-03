import { NextFunction, Request, Response } from 'express';

interface CustomRequest extends Request {
    [key: string]: any;
}

interface CustomResponse extends Response {
    [key: string]: any;
}

interface BusinessLoigc {
    (req: CustomRequest, res: CustomResponse, next: NextFunction): any;
}

export { CustomRequest, CustomResponse, NextFunction, BusinessLoigc };