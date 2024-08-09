import { Router } from 'express';
import { userServiceRouter } from './user.router';
import { restaurantServiceRouter } from './restaurant.router';

export const nodemonsterRouter = () => {
    const app = Router();

    userServiceRouter(app);
    restaurantServiceRouter(app);

    return app;
};
