import jwt from 'jsonwebtoken';
import { BusinessLoigc } from '../shared/BusinessLogicInterface';
import { errorHandler } from './errorHandler';
import { TokenPayload } from '../shared/TokenPayloadInterface';
import { config } from '../config';
import { ExpiredTokenError, UnAuthorizedError } from '../shared/exception';

const verifyTokenLogic: (type: string, headers: string) => BusinessLoigc = 
    (type: string , headers: string) => (req, res, next) => {
        try {
            const token: string = req.headers[headers] as string;
            if (!token) {
                return next(new UnAuthorizedError('Token is not provided'));
            }
            const payload: TokenPayload = jwt.verify(
                token.slice(7),
                config.jwtSecret,
            ) as unknown as TokenPayload;
            if (payload.type !== type) {
                return next(new UnAuthorizedError('Token type is not valid'));
            } 
            req.decoded = payload;
            next();
        } catch (err) {
            if (err.message === 'ExpiredError') {
                next(new ExpiredTokenError('Token is expired'));
            } else {
                next(new UnAuthorizedError('Token is not valid'));
            }
        }
    };

const verifyTokenMiddleware: BusinessLoigc = errorHandler(
    verifyTokenLogic('access', 'authorization'),
);

const verifyRefreshTokenMiddleware: BusinessLoigc = errorHandler(
    verifyTokenLogic('refresh', 'refresh-token'),
);

export { verifyTokenMiddleware, verifyRefreshTokenMiddleware };