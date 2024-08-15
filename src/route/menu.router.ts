import { Router } from 'express';
import { MenuController } from '../controller/menu.controller';
import { errorHandler } from '../middleware/errorHandler';
import { verifyTokenMiddleware } from '../middleware/verifyToken';

const router: Router = Router();

export const menuServiceRouter = (app: Router) => {
    const menuController: MenuController = new MenuController();

    app.use('/menu', router);

    router.get('/:menu_id', errorHandler(menuController.getMenuById));

    router.get('/restaurant/:restaurant_id', errorHandler(menuController.getMenusByRestaurant));

    router.post('/', verifyTokenMiddleware, errorHandler(menuController.createMenu));

    router.patch('/:menu_id', verifyTokenMiddleware, errorHandler(menuController.updateMenu));

    router.delete('/:menu_id', verifyTokenMiddleware, errorHandler(menuController.deleteMenu));
};
