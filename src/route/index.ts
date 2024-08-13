import { Router } from 'express';
import { userServiceRouter } from './user.router';
import { restaurantServiceRouter } from './restaurant.router';
import { menuServiceRouter } from './menu.router';

export const nodemonsterRouter = () => {
    const app = Router();

    userServiceRouter(app);
    restaurantServiceRouter(app);
    menuServiceRouter(app);

    return app;
};
