import { Router } from 'express';
import { RestaurantController } from '../controller/restaurant.controller';
import { errorHandler } from '../middleware/errorHandler';
import { verifyTokenMiddleware } from '../middleware/verifyToken';

const router: Router = Router();
export const restaurantServiceRouter = (app: Router) => {
    const restaurantController: RestaurantController = new RestaurantController();

    app.use('/restaurant', router);

    router.get('/', errorHandler(restaurantController.getAllRestaurant));
    
    router.get('/search', errorHandler(restaurantController.searchRestaurant)); //path value는 param 밑에 위치 시키기

    router.get('/:restaurant_id', errorHandler(restaurantController.getOneRestaurant));

    router.post('/', verifyTokenMiddleware, errorHandler(restaurantController.createRestaurant));

    router.patch('/:restaurant_id', verifyTokenMiddleware, errorHandler(restaurantController.updateRestaurant));

    router.delete('/:restaurant_id', verifyTokenMiddleware, errorHandler(restaurantController.deleteRestaurant));
};
