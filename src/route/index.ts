import { Router } from 'express';
import { userServiceRouter } from './user.router';

export const nodemonsterRouter = () => {
    const app = Router();

    userServiceRouter(app);

    return app;
};